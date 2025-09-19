"use client";
import React from 'react';
import { Box, Typography, Card, CardContent, Button, Chip, TextField, InputAdornment, Select, MenuItem, Stack, IconButton, LinearProgress, Drawer, Divider, Slider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import MiniLine from '../../components/charts/MiniLine';
import { CAREER_PATHS } from './careersData';

type SortKey = 'relevance' | 'salary' | 'demand';

export default function CareerGuidance() {
  const theme = useTheme();
  const [q, setQ] = React.useState('');
  const [category, setCategory] = React.useState<string>('All');
  const [sort, setSort] = React.useState<SortKey>('relevance');
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [profile, setProfile] = React.useState<{ skills?: string[] }>({ skills: [] });
  const [compare, setCompare] = React.useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [demandFilter, setDemandFilter] = React.useState<string[]>([]); // ['High','Medium','Low']
  const [salaryRange, setSalaryRange] = React.useState<number[]>([0, 40]); // in LPA (approx)
  const [growthTags, setGrowthTags] = React.useState<string[]>([]);
  const [visible, setVisible] = React.useState(8);

  React.useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(fav);
    const ps = localStorage.getItem('studentProfile');
    if (ps) setProfile(JSON.parse(ps));
  }, []);

  const toggleFav = (slug: string) => {
    setFavorites((f) => {
      const next = f.includes(slug) ? f.filter(x => x !== slug) : [...f, slug];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const categories = React.useMemo(() => ['All', ...Array.from(new Set(CAREER_PATHS.map((c: any) => c.category).filter(Boolean)))], []);
  const allGrowth = React.useMemo(() => Array.from(new Set(CAREER_PATHS.flatMap((c: any) => c.outlook?.futureTrends || []))), []);

  const filtered = React.useMemo(() => {
    let list = CAREER_PATHS.filter((c: any) =>
      (!q || c.title.toLowerCase().includes(q.toLowerCase()) || (c.desc || '').toLowerCase().includes(q.toLowerCase())) &&
      (category === 'All' || c.category === category)
    ).map((c: any) => {
      const req: string[] = c.requiredSkills || [];
      const have = (profile.skills || []).map(s => s.toLowerCase());
      const match = req.length ? Math.round(req.filter(s => have.includes(s.toLowerCase())).length / req.length * 100) : 0;
      return { ...c, _match: match };
    });
    // Sidebar filters
    if (demandFilter.length) {
      list = list.filter((c: any) => demandFilter.includes(c.outlook?.demand));
    }
    if (salaryRange) {
      const [minL, maxL] = salaryRange;
      list = list.filter((c: any) => {
        const mid = (c.salaries?.mid || 0) / 100000; // convert to LPA
        return mid >= minL && mid <= maxL;
      });
    }
    if (growthTags.length) {
      list = list.filter((c: any) => (c.outlook?.futureTrends || []).some((t: string) => growthTags.includes(t)));
    }
    if (sort === 'salary') {
      list.sort((a: any, b: any) => (b.salaries?.mid || 0) - (a.salaries?.mid || 0));
    } else if (sort === 'demand') {
      const rank: any = { High: 3, Medium: 2, Low: 1 };
      list.sort((a: any, b: any) => (rank[b.outlook?.demand] || 0) - (rank[a.outlook?.demand] || 0));
    } else {
      list.sort((a: any, b: any) => (b._match || 0) - (a._match || 0));
    }
    return list;
  }, [q, category, sort, profile.skills, demandFilter, salaryRange, growthTags]);

  const marketSeries = [12, 20, 18, 30, 35, 42];

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #ffffff 100%)` }}>
      {/* Hero */}
      <Box sx={{ py: 6, background: `linear-gradient(140deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)` }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3 }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Explore Careers
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Search, filter, and discover roles matched to your skills.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto auto' }, gap: 2, mt: 2 }}>
            <TextField
              placeholder="Search roles, keywords..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
            />
            <Stack direction="row" spacing={1} alignItems="center" sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              {categories.map(cat => (
                <Chip
                  key={cat}
                  label={cat}
                  color={category === cat ? 'primary' : 'default'}
                  variant={category === cat ? 'filled' : 'outlined'}
                  onClick={() => setCategory(cat)}
                />
              ))}
            </Stack>
            <Select size="small" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <MenuItem value="relevance">Sort: Relevance</MenuItem>
              <MenuItem value="salary">Sort: Salary</MenuItem>
              <MenuItem value="demand">Sort: Demand</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      {/* Results */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '260px 1fr' }, gap: 2 }}>
        {/* Sticky sidebar filters */}
        <Box sx={{ position: { md: 'sticky' }, top: { md: 88 }, alignSelf: 'start', height: 'fit-content' }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700}>Filters</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="caption" color="text.secondary">Demand</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mb={1} mt={0.5}>
                {['High','Medium','Low'].map((d) => (
                  <Chip key={d} label={d} color={demandFilter.includes(d) ? 'secondary' : 'default'} variant={demandFilter.includes(d) ? 'filled' : 'outlined'} onClick={() => setDemandFilter((cur) => cur.includes(d) ? cur.filter(x=>x!==d) : [...cur, d])} />
                ))}
              </Stack>
              <Typography variant="caption" color="text.secondary">Salary (mid) range · LPA</Typography>
              <Slider value={salaryRange} onChange={(_,v)=>setSalaryRange(v as number[])} valueLabelDisplay="auto" min={0} max={60} sx={{ mt: 1, mb: 1 }} />
              <Typography variant="caption" color="text.secondary">Growth tags</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                {allGrowth.slice(0,8).map((t) => (
                  <Chip key={t} label={t} size="small" color={growthTags.includes(t)?'primary':'default'} variant={growthTags.includes(t)?'filled':'outlined'} onClick={()=>setGrowthTags((g)=> g.includes(t)? g.filter(x=>x!==t): [...g,t])} />
                ))}
              </Stack>
            </CardContent>
          </Card>
          <Button fullWidth sx={{ mt: 1 }} variant="outlined" onClick={()=>{setDemandFilter([]);setSalaryRange([0,40]);setGrowthTags([]);}}>Clear filters</Button>
        </Box>

        <Box>
          {/* Recommendation ribbon */}
          <Typography variant="subtitle1" fontWeight={700} mb={1}>Top matches for you</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {filtered.slice(0, 5).map((c: any) => (
              <Chip key={c.slug || c.title} label={`${c.title}`} variant="outlined" />
            ))}
          </Stack>

          {/* Cards grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {filtered.slice(0, visible).map((c: any) => (
              <Card key={c.slug} variant="outlined" sx={{ position: 'relative' }}>
                <IconButton onClick={() => toggleFav(c.slug)} sx={{ position: 'absolute', top: 8, right: 8 }} aria-label="favorite">
                  {favorites.includes(c.slug) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Chip size="small" label={c.category || 'General'} />
                    {c.outlook?.demand && <Chip size="small" color="secondary" label={c.outlook.demand} />}
                  </Stack>
                  <Typography variant="h6" fontWeight={700}>{c.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>{c.desc}</Typography>
                  <Box mb={1}>
                    <Typography variant="caption" color="text.secondary">Skill match</Typography>
                    <LinearProgress variant="determinate" value={c._match} sx={{ height: 8, borderRadius: 4 }} />
                    <Typography variant="caption">{c._match}%</Typography>
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                    {(c.requiredSkills || []).slice(0, 4).map((s: string) => (
                      <Chip key={s} label={s} size="small" />
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} href={`/career-guidance/${c.slug}`} variant="contained">View Details</Button>
                    <Button component={Link} href={`/career-guidance/${c.slug}`} variant="outlined">Gap Analysis</Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        setCompare((cur) => {
                          if (cur.includes(c.slug)) return cur.filter((x) => x !== c.slug);
                          if (cur.length >= 3) return cur; // cap 3
                          return [...cur, c.slug];
                        });
                        setDrawerOpen(true);
                      }}
                    >
                      Compare
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Pagination */}
          {visible < filtered.length && (
            <Box mt={2} textAlign="center">
              <Button variant="outlined" onClick={()=> setVisible((v)=> v+6)}>Load more</Button>
            </Box>
          )}

          {/* Market Trends */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight={700} mb={1}>Market Trends</Typography>
            <Typography variant="body2" color="text.secondary">A quick snapshot of overall market growth (demo)</Typography>
            <Box mt={1}>
              <MiniLine data={marketSeries} width={520} height={140} />
            </Box>
          </Box>

          <Box mt={4} textAlign="center">
            <Button variant="contained" color="primary" size="large" href="/dashboard" sx={{ borderRadius: 3, px: 5, py: 1.5, fontWeight: 600 }}>
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        {/* Compare Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
          <Box sx={{ width: { xs: 320, md: 420 }, p: 2 }}>
            <Typography variant="h6" fontWeight={700}>Compare Careers ({compare.length}/3)</Typography>
            <Divider sx={{ my: 1 }} />
            {compare.length === 0 && (
              <Typography variant="body2" color="text.secondary">Select up to 3 careers using the Compare button.</Typography>
            )}
            {compare.length > 0 && (
              <Box>
                {compare.map((slug) => {
                  const c: any = CAREER_PATHS.find((x: any) => x.slug === slug);
                  if (!c) return null;
                  const mid = Math.round((c.salaries?.mid || 0) / 100000);
                  return (
                    <Card key={slug} variant="outlined" sx={{ mb: 1 }}>
                      <CardContent>
                        <Typography fontWeight={700}>{c.title}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1} mt={0.5}>
                          <Chip size="small" label={c.category || 'General'} />
                          {c.outlook?.demand && <Chip size="small" color="secondary" label={c.outlook.demand} />}
                          <Chip size="small" label={`Mid ₹${mid}L`} />
                        </Stack>
                        <Typography variant="caption" color="text.secondary">Top skills</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {(c.requiredSkills || []).slice(0,5).map((s: string) => <Chip key={s} label={s} size="small" />)}
                        </Stack>
                        <Stack direction="row" spacing={1} mt={1}>
                          <Button component={Link} href={`/career-guidance/${c.slug}`} size="small" variant="outlined">Details</Button>
                          <Button size="small" color="error" onClick={()=> setCompare((cur)=> cur.filter(x=>x!==slug))}>Remove</Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            )}
            <Stack direction="row" spacing={1} mt={2}>
              <Button onClick={()=> setCompare([])} disabled={!compare.length}>Clear</Button>
              <Button variant="contained" disabled={compare.length<2} onClick={()=> setDrawerOpen(false)}>Done</Button>
            </Stack>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

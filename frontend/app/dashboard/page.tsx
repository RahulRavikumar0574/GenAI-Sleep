"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, TextField, Chip, Stack, Divider, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import Donut from '../../components/charts/Donut';
import Gauge from '../../components/charts/Gauge';

// Minimal career data imports for recommendations
import { CAREER_PATHS } from '../career-guidance/careersData';

type StudentProfile = {
  name: string;
  age?: number | '';
  educationLevel: string;
  skills: string[];
  interests: string[];
  workStyle: string;
  salaryPreference?: string;
};

const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  age: '',
  educationLevel: 'High School',
  skills: [],
  interests: [],
  workStyle: 'Hybrid',
  salaryPreference: 'Medium',
};

const ALL_SKILLS = [
  'Programming', 'Data Analysis', 'Communication', 'Teamwork', 'Problem Solving', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Design', 'Marketing', 'Finance'
];

const ALL_INTERESTS = [
  'Engineering & Tech', 'Medical & Healthcare', 'Business & Management', 'Research', 'Creative', 'People-facing', 'Remote work'
];

export default function Dashboard() {
  const [user, setUser] = useState<unknown>(null);
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  // Load user and profile from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
    const profStr = localStorage.getItem('studentProfile');
    if (profStr) setProfile(JSON.parse(profStr));
  }, []);

  // Persist profile on change
  useEffect(() => {
    localStorage.setItem('studentProfile', JSON.stringify(profile));
  }, [profile]);

  // Simple recommendation: score by overlapping skills + interests with career requirements/categories
  const recommendations = useMemo(() => {
    const scored = CAREER_PATHS.map((c: any) => {
      const skillOverlap = (c.requiredSkills || []).filter((s: string) => profile.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())).length;
      const interestHit = profile.interests.some((i) => (c.category && i.toLowerCase().includes(c.category.toLowerCase())));
      const score = skillOverlap * 2 + (interestHit ? 1 : 0);
      return { ...c, _score: score };
    }).sort((a: any, b: any) => b._score - a._score);
    return scored.slice(0, 3);
  }, [profile]);

  // Skill score as percent of top recommended career requirements met
  const skillScore = useMemo(() => {
    if (!recommendations.length) return 0;
    const top = recommendations[0];
    const req = (top.requiredSkills || []).length || 1;
    const have = (top.requiredSkills || []).filter((s: string) => profile.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())).length;
    return Math.round((have / req) * 100);
  }, [recommendations, profile.skills]);

  // Radar data: use top recommended career's top 5 required skills

  const addChip = (type: 'skills' | 'interests', value: string) => {
    const v = value.trim();
    if (!v) return;
    setProfile((p: StudentProfile) => ({ ...p, [type]: Array.from(new Set([...(p[type] as string[]), v])) }));
    if (type === 'skills') setNewSkill(''); else setNewInterest('');
  };

  const removeChip = (type: 'skills' | 'interests', value: string) => {
    setProfile((p: StudentProfile) => ({ ...p, [type]: (p[type] as string[]).filter((x: string) => x !== value) }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)', p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1100 }}>
          <Card sx={{ borderRadius: 4, boxShadow: 6, p: 3, background: 'rgba(255,255,255,0.95)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ bgcolor: '#6366f1', width: 64, height: 64, mr: 2 }}>
                  <SchoolIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight={700} color="#1e293b">
                    {(() => {
                      if (user && typeof user === 'object' && user !== null && 'username' in user && typeof (user as { username?: unknown }).username === 'string') {
                        return `Starting Hub, ${(user as { username: string }).username}`;
                      }
                      return 'Starting Hub';
                    })()}
                  </Typography>
                  <Typography variant="subtitle1" color="#64748b">
                    Tell us about yourself and explore tailored career paths
                  </Typography>
                </Box>
              </Box>

              {/* KPI Row */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700}>CSAT</Typography>
                    <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                      <Donut value={70} barColor="#0ea5e9" trackColor="#e2e8f0" center={<Typography variant="h5" fontWeight={800}>70%</Typography>} />
                    </Box>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700}>Total Revenue</Typography>
                    {/* Mini stacked bars to mimic the look */}
                    <Box mt={1}>
                      {[20, 35, 40, 50].map((v, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ height: 10, width: `${v}%`, bgcolor: i % 2 === 0 ? '#93c5fd' : '#60a5fa', borderRadius: 2 }} />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700}>Team Performance</Typography>
                    <Box display="flex" justifyContent="center" mt={-1}>
                      <Gauge value={Math.max(10, skillScore)} barColor="#0ea5e9" trackColor="#e2e8f0" />
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Profile & Skills Input */}
              <Typography variant="h6" fontWeight={700} color="#334155" gutterBottom>
                Profile & Skills
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField fullWidth label="Name" value={profile.name} onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))} />
                <TextField fullWidth type="number" label="Age" value={profile.age} onChange={(e) => setProfile(p => ({ ...p, age: e.target.value ? Number(e.target.value) : '' }))} />
                <FormControl fullWidth>
                  <InputLabel id="edu">Education Level</InputLabel>
                  <Select labelId="edu" label="Education Level" value={profile.educationLevel} onChange={(e) => setProfile(p => ({ ...p, educationLevel: e.target.value }))}>
                    <MenuItem value="High School">High School</MenuItem>
                    <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                    <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ gridColumn: { md: 'span 2' } }}>
                  <TextField select fullWidth label="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} SelectProps={{ native: false }}>
                    {ALL_SKILLS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>
                </Box>
                <Box>
                  <Button fullWidth variant="contained" onClick={() => addChip('skills', newSkill)} disabled={!newSkill}>Add Skill</Button>
                </Box>
                <Box sx={{ gridColumn: { md: 'span 2' } }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {profile.skills.map((s) => (
                      <Chip key={s} label={s} onDelete={() => removeChip('skills', s)} color="primary" variant="outlined" sx={{ mb: 1 }} />
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ gridColumn: { md: 'span 2' } }}>
                  <TextField select fullWidth label="Add an interest/preference" value={newInterest} onChange={(e) => setNewInterest(e.target.value)}>
                    {ALL_INTERESTS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>
                </Box>
                <Box>
                  <Button fullWidth variant="contained" onClick={() => addChip('interests', newInterest)} disabled={!newInterest}>Add Interest</Button>
                </Box>
                <Box sx={{ gridColumn: { md: 'span 2' } }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {profile.interests.map((s) => (
                      <Chip key={s} label={s} onDelete={() => removeChip('interests', s)} color="success" variant="outlined" sx={{ mb: 1 }} />
                    ))}
                  </Stack>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Career Readiness Tools (summary) */}
              <Typography variant="h6" fontWeight={700} color="#334155" gutterBottom>
                Career Readiness Tools
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700}>Gap Analysis</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Compares your skills with required skills of a career. Open any career to see detailed gaps.
                    </Typography>
                    <Button href="/career-guidance" variant="contained">Open Career Explorer</Button>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700}>Roadmap Generator</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Generates a learning plan to close gaps with curated resources.
                    </Typography>
                    <Button href="/career-guidance" variant="outlined">Generate via Explorer</Button>
                  </CardContent>
                </Card>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Dashboard Metrics */}
              <Typography variant="h6" fontWeight={700} color="#334155" gutterBottom>
                Dashboard Metrics
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700}>Suggested Careers</Typography>
                    <Stack spacing={1} mt={1}>
                      {recommendations.map((c) => (
                        <Button key={c.slug} href={`/career-guidance/${c.slug}`} variant="text" sx={{ justifyContent: 'flex-start' }}>
                          {c.title}
                        </Button>
                      ))}
                      {!recommendations.length && (
                        <Typography variant="body2" color="text.secondary">Add some skills and interests to see suggestions.</Typography>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700}>Current Skill Score</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>Match against top recommended career</Typography>
                    <LinearProgress variant="determinate" value={skillScore} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
                    <Typography variant="body2">{skillScore}% match</Typography>
                  </CardContent>
                </Card>
                <Box sx={{ gridColumn: { md: 'span 2' } }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={700}>Learning Modules / Resources</Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>Links to free resources based on your interests</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {recommendations.flatMap((c) => (c.resources || [])).slice(0, 6).map((r, i: number) => (
                          <Button key={i} href={r.url} target="_blank" rel="noopener" variant="outlined" size="small">{r.title}</Button>
                        ))}
                        {recommendations.length === 0 && (
                          <Typography variant="body2" color="text.secondary">No resources yet. Add interests to get tailored links.</Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              <Box mt={4} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ borderRadius: 3, px: 5, py: 1.5, fontWeight: 600, fontSize: '1.1rem', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)' }}
                  href="/career-guidance"
                >
                  Explore Careers
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

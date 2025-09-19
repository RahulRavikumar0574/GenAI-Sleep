"use client";
import { useRouter } from 'next/navigation';
import { CAREER_PATHS } from '../careersData';
import { notFound } from 'next/navigation';
import { Box, Typography, Stack, Chip, Divider, Avatar, Button } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import Image from 'next/image';
import * as React from 'react';

export default function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  // Unwrap params using React.use()
  const { slug } = React.use(params);
  const career = CAREER_PATHS.find((c: any) => c.slug === slug);
  if (!career) return notFound();

  // Use available fields and provide fallback/mock data for missing ones
  const stats = [
    { label: 'Avg. Salary', value: '₹8L' },
    { label: 'Job Growth', value: '7%' },
    { label: 'Work/Life', value: 'Balanced' },
  ];
  const timeline = career.timeline || [
    { time: '8:00 AM', activity: 'Arrive at office/court', color: 'primary' },
    { time: '10:00 AM', activity: 'Client meetings & case prep', color: 'secondary' },
    { time: '1:00 PM', activity: 'Court hearings or research', color: 'info' },
    { time: '4:00 PM', activity: 'Drafting documents', color: 'success' },
    { time: '6:00 PM', activity: 'Wrap up & review', color: 'warning' },
  ];
  const dos = career.dos || [];
  const donts = career.donts || [];
  // Related careers mock
  const related = [
    { slug: 'judge', title: 'Judge', image: '/images/judge.jpg' },
    { slug: 'legal-advisor', title: 'Legal Advisor', image: '/images/legal-advisor.jpg' },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Box sx={{ position: 'relative', height: 280, mb: 3, borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
        <Image src={career.image} alt={career.title} fill style={{ objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', p: 2 }}>
          <Typography variant="h3" fontWeight={700}>{career.title}</Typography>
          <Typography variant="subtitle1">{career.desc}</Typography>
        </Box>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mb={3}>
        <Box flex={2}>
          <Typography variant="h5" fontWeight={600} mb={1}>Overview</Typography>
          <Typography mb={2}>{career.details}</Typography>
          {/* No tags in data, so skip tags UI */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" fontWeight={600} mb={1}>Key Stats</Typography>
          <Stack direction="row" spacing={2} mb={2}>
            {stats.map((stat: any) => (
              <Box key={stat.label} sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box flex={1}>
          <Typography variant="h6" fontWeight={600} mb={1}>Related Careers</Typography>
          <Stack spacing={1}>
            {related.map((rel: any) => (
              <Button key={rel.slug} href={`/career-guidance/${rel.slug}`} variant="outlined" startIcon={<Avatar src={rel.image} sx={{ width: 24, height: 24 }} />} sx={{ justifyContent: 'flex-start' }}>
                {rel.title}
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" fontWeight={600} mb={2}>A Day in the Life</Typography>
      <Timeline position="alternate">
        {timeline.map((item: any, idx: number) => (
          <TimelineItem key={idx}>
            <TimelineSeparator>
              <TimelineDot color={item.color || 'primary'} />
              {idx < timeline.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1" fontWeight={600}>{item.time}</Typography>
              <Typography variant="body2">{item.activity}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Divider sx={{ my: 3 }} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Box flex={1}>
          <Typography variant="h6" fontWeight={600} mb={1}>Do's</Typography>
          <ul>
            {dos.map((d: string, i: number) => (
              <li key={i}><Typography>{d}</Typography></li>
            ))}
          </ul>
        </Box>
        <Box flex={1}>
          <Typography variant="h6" fontWeight={600} mb={1}>Don'ts</Typography>
          <ul>
            {donts.map((d: string, i: number) => (
              <li key={i}><Typography>{d}</Typography></li>
            ))}
          </ul>
        </Box>
      </Stack>
      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={() => router.back()} sx={{ borderRadius: 3, px: 5, py: 1.5, fontWeight: 600, fontSize: '1.1rem', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)' }}>
          Go Back
        </Button>
      </Box>
      <style jsx>{`
        ul {
          padding-left: 1.2em;
        }
        li {
          margin-bottom: 0.5em;
          animation: fadeIn 0.7s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}

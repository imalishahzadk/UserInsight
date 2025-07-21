'use client';
import { Box, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Image from 'next/image';

interface BotStats {
  label: string;
  value: string;
}

interface BotCard {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  stats: BotStats[];
  createdAt: string;
}

const mockBots: BotCard[] = [
  {
    name: 'Family RV customer support',
    description: 'AI powered customer support for RV related inquiries.',
    status: 'Active',
    stats: [
      { label: 'Users', value: '2.4K' },
      { label: 'Messages', value: '2.4K' },
      { label: 'Accuracy', value: '2.4K' },
    ],
    createdAt: '26/12/2024'
  },
  {
    name: 'Family RV customer support',
    description: 'AI powered customer support for RV related inquiries.',
    status: 'Active',
    stats: [
      { label: 'Users', value: '2.4K' },
      { label: 'Messages', value: '2.4K' },
      { label: 'Accuracy', value: '2.4K' },
    ],
    createdAt: '26/12/2024'
  }
];

export default function ActiveBotsList() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>
            Most active bots
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Manage and monitor your AI agents
          </Typography>
        </Box>
      </Box>

      {/* Bot Cards Grid */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3
      }}>
        {mockBots.map((bot, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              p: 3,
              boxShadow: '0px 4px 35px 0px #0D0A2C0F'
            }}
          >
            {/* Bot Header */}
            <Box sx={{ 
              display: 'flex',
              gap: 2,
              mb: 3
            }}>
              <Box sx={{ 
                width: 48,
                height: 48,
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <Image
                  src="/images/profile-placeholder.png"
                  alt={bot.name}
                  fill
                  sizes="48px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    {bot.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <ContentCopyIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton size="small">
                      <SettingsIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: 14, color: '#666' }}>
                  {bot.description}
                </Typography>
              </Box>
            </Box>

            {/* Bot Stats */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              mb: 3,
              gap: 2
            }}>
              {bot.stats.map((stat, idx) => (
                <Box key={idx} sx={{ textAlign: 'center' }}>
                  <Box sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#E8F0FE',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    mx: 'auto'
                  }}>
                    <Typography sx={{ fontSize: 12, color: '#4285f4' }}>
                      {idx + 1}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 14, color: '#666', mb: 0.5 }}>
                    {stat.label}
                  </Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Bot Footer */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography sx={{ fontSize: 14, color: '#666' }}>
                Created {bot.createdAt}
              </Typography>
              <Box sx={{ 
                px: 2,
                py: 0.5,
                bgcolor: bot.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                color: bot.status === 'Active' ? '#34A853' : '#D32F2F',
                borderRadius: 50,
                fontSize: 14
              }}>
                {bot.status}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
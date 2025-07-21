'use client';
import { Box } from '@mui/material';

interface EmailPreviewProps {
  subject: string;
  content: string;
  companyName?: string;
  companyLogo?: string;
}

export default function EmailPreview({ subject, content, companyName = 'Company Name', companyLogo }: EmailPreviewProps) {
  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '600px',
      mx: 'auto',
      bgcolor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #E5E7EB',
    }}>
      {/* Email Header */}
      <Box sx={{ 
        bgcolor: '#F8F9FA', 
        p: 2,
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        {companyLogo ? (
          <img 
            src={companyLogo} 
            alt={companyName}
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px',
              objectFit: 'cover'
            }} 
          />
        ) : (
          <Box sx={{ 
            width: '32px',
            height: '32px',
            bgcolor: '#4285f4',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600
          }}>
            {companyName[0]}
          </Box>
        )}
        <Box>
          <Box sx={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
            {companyName}
          </Box>
          <Box sx={{ fontSize: '12px', color: '#6B7280' }}>
            {subject}
          </Box>
        </Box>
      </Box>

      {/* Email Content */}
      <Box sx={{ p: 3 }}>
        <div 
          dangerouslySetInnerHTML={{ 
            __html: content.replace(/\n/g, '<br />').replace(
              /{([^}]+)}/g, 
              '<span style="color: #4285f4">$&</span>'
            )
          }} 
        />
      </Box>

      {/* Email Footer */}
      <Box sx={{ 
        borderTop: '1px solid #E5E7EB',
        p: 2,
        bgcolor: '#F8F9FA',
        fontSize: '12px',
        color: '#6B7280',
        textAlign: 'center'
      }}>
        <Box sx={{ mb: 1 }}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </Box>
        <Box>
          This email was sent by {companyName}. Please do not reply to this email.
        </Box>
      </Box>
    </Box>
  );
}
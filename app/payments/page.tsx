'use client';
import { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';
import LockIcon from '@mui/icons-material/Lock';

const PaymentMethods = [
  { 
    id: 'credit', 
    label: 'Credit Card', 
    iconPath: '/images/credit-card.png'
  },
  { 
    id: 'bank', 
    label: 'Bank Transfer', 
    iconPath: '/images/bank.png'
  },
  { 
    id: 'cosmic', 
    label: 'Cosmic Points', 
    iconPath: '/images/cosmic.png'
  }
];

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <Container maxWidth="xl" sx={{ height: 'calc(100vh - 32px)' }}>
      <Box sx={{ 
        display: 'flex',
        height: '100%',
        bgcolor: 'white',
        borderRadius: '24px',
        overflow: 'hidden'
      }}>
        {/* Left Scrollable Section */}
        <Box sx={{ 
          width: { xs: '100%', md: '65%' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ 
                fontSize: 32,
                fontWeight: 600,
                mb: 1
              }}>
                Upgrade to Plus
              </Typography>
              <Typography sx={{ 
                color: '#666',
                fontSize: 15
              }}>
                Do more with unlimited blocks, files, automations & integrations.
              </Typography>
            </Box>

            {/* Payment Form */}
            <Box sx={{ maxWidth: '600px' }}>
              <Typography sx={{ 
                fontSize: 15,
                mb: 3,
                color: '#666'
              }}>
                Payment Details
              </Typography>

              {/* Payment Method Toggles */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
                mb: 4
              }}>
                {PaymentMethods.map((method) => (
                  <Box
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      p: 3,
                      bgcolor: method.id === paymentMethod ? '#EBF2FF' : 'white',
                      color: method.id === paymentMethod ? '#4285f4' : '#333',
                      border: '1px solid',
                      borderColor: '#e0e0e0',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      height: '100px',
                      '&:hover': {
                        borderColor: method.id === paymentMethod ? '#4285f4' : '#ccc'
                      }
                    }}
                  >
                    <Box sx={{ 
                      width: 24,
                      height: 24,
                      position: 'relative'
                    }}>
                      <Image
                        src={method.iconPath}
                        alt={method.label}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography sx={{ 
                      fontSize: 16,
                      fontWeight: method.id === paymentMethod ? 500 : 400,
                      color: method.id === paymentMethod ? '#4285f4' : '#000'
                    }}>
                      {method.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Card Details Form */}
              <Box component="form">
                <Box sx={{ mb: 3, position: 'relative' }}>
                  <TextField
                    fullWidth
                    placeholder="Card holder name"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 52,
                        borderRadius: '8px'
                      }
                    }}
                  />
                  <Box sx={{ 
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: 30,
                    width: 45,
                  }}>
                    <Image
                      src="/images/mastercard.png"
                      alt="Mastercard"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Card number"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 52,
                        borderRadius: '8px'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: 2,
                  mb: 3
                }}>
                  <TextField
                    placeholder="Expiration date"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 52,
                        borderRadius: '8px'
                      }
                    }}
                  />
                  <TextField
                    placeholder="CVV"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 52,
                        borderRadius: '8px'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Amount"
                    defaultValue="$16"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 52,
                        borderRadius: '8px'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: 2
                }}>
                  <Button
                    variant="outlined"
                    sx={{ 
                      py: 1.5,
                      textTransform: 'none',
                      color: '#666',
                      borderColor: '#e0e0e0'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ 
                      py: 1.5,
                      bgcolor: '#4285f4',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#3367d6' }
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>

                <Typography sx={{ 
                  mt: 3,
                  color: '#666',
                  fontSize: 13
                }}>
                  By providing your card information, you allow us to charge your card for future payment in accordance with their terms.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ 
          width: { xs: '100%', md: '35%' },
          bgcolor: '#eff3f6',
          p: { xs: 3, md: 4 },
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          position: 'relative',
          height: '100%'
        }}>
          {/* Total and Security Info */}
          <Box>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                Total
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                $16 / Month
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex',
              gap: 2,
              color: '#666'
            }}>
              <LockIcon sx={{ fontSize: 20 }} />
              <Typography sx={{ fontSize: 14 }}>
                Guaranteed to be safe & secure, ensuring that all transactions are protected with the highest level of security.
              </Typography>
            </Box>
          </Box>

          {/* Bottom Right Image */}
          <Box sx={{ 
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '80%',
            height: '50%',
            pt: 4
          }}>
            <Image
              src="/images/payment-illustration.png"
              alt="Payment Illustration"
              fill
              style={{ 
                objectFit: 'contain',
                objectPosition: 'bottom right'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
import Spinner from "@/components/shared/ui/Spinner";
import useSubscription from "@/hooks/client/use-subscription";
import subscriptionService from "@/services/api/subscription-service";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const ManageSubscription = () => {
  const { createBillingPortal, isCreatingBillingPortal } = useSubscription();

  const { data, isFetching } = useQuery({
    queryKey: ["subscription-details"],
    queryFn: () => subscriptionService.getSubscription(),
    refetchOnWindowFocus: false,
  });

  if (isFetching || !data) {
    return null;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "16px",
        p: { xs: 2, md: 4 },
        mb: 4,
        bgcolor: "#7367f033",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" className="text-white" gutterBottom>
            Package
          </Typography>
          <Typography variant="h6" className="text-white">
            {data.activePlan}
          </Typography>
        </Grid>

        {data.activePlan !== "FREE" && (
          <>
            <Grid item xs={12} md={3}>
              <Typography
                variant="subtitle2"
                className="text-white"
                gutterBottom
              >
                Active Date
              </Typography>
              <Typography className="text-white">
                {data.currentPeriodStart}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                variant="subtitle2"
                className="text-white"
                gutterBottom
              >
                Remaining Days
              </Typography>
              <Typography className="text-white">
                {data.remainingDays} days
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                variant="subtitle2"
                className="text-white"
                gutterBottom
              >
                Expire Date
              </Typography>
              <Typography className="text-white">
                {data.currentPeriodEnd}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 4,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          disabled={isCreatingBillingPortal}
          onClick={createBillingPortal}
          sx={{
            background: "#7367f0",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            py: 1,
            "&:hover": {
              background: "rgba(115, 103, 240, 0.03)",
            },
          }}
        >
          {isCreatingBillingPortal ? <Spinner size={18} /> : "Manage"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ManageSubscription;

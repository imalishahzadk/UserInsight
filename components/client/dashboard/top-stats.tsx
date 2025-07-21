"use client";
import analyticsService from "@/services/api/client/analytics-service";
import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface PageData {
  page: string;
  visits: number;
}

interface LocationData {
  location: string;
  count: number;
}

interface TrafficSourceData {
  source: string;
  count: number;
}

interface DashboardData {
  users: { total: number; last30d: number };
  events: { total: number; last30d: number };
  insights: { total: number; last30d: number };
  activeInsights: { total: number; last30d: number };
  topPages: PageData[];
  topLocations: LocationData[];
  topTrafficSources: TrafficSourceData[];
}

export default function TopStats() {
  const { data, isFetching, error } = useQuery<DashboardData>({
    queryKey: ["dashboard-statistics", "client"],
    queryFn: () => analyticsService.getDashboardCardStatistics(),
    refetchOnWindowFocus: false,
  });

  // console.log(data);

  if (isFetching || !data) {
    return <></>;
  }

  const stats = [
    {
      title: "Users",
      value: data?.users?.total,
      color: "#fff", // changed to black
      subtitle: "Total Visitors",
      change: `Last 30d: +${data?.users?.last30d}`,
    },
    {
      title: "Events",
      value: data?.events?.total,
      color: "#fff",
      subtitle: "Total Events",
      change: `Last 30d: +${data?.events?.last30d}`,
    },
    {
      title: "Trackers",
      value: data?.insights?.total,
      color: "#fff",
      subtitle: "Total Trackers",
      change: `Last 30d: +${data?.insights?.last30d}`,
    },
    {
      title: "Active Trackers",
      value: data?.activeInsights?.total,
      color: "#fff",
      subtitle: "Active Trackers",
      change: `Last 30d: +${data?.activeInsights?.last30d}`,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {stats?.map((stat, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: "#7367f033",
                borderRadius: "16px",
                p: 3,
                height: "100%",
                border: "1px solid #7367f033",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#fff",
                  mb: 2,
                }}
              >
                {stat.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: stat.color,
                  mb: 1,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: 14,
                  }}
                >
                  {stat.subtitle}
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  {stat.change}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Top Pages Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "#7367f033",
              borderRadius: "16px",
              p: 3,
              height: "100%",
              border: "1px solid #7367f033",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: 600, color: "#fff", mb: 2 }}
            >
              Top Pages
            </Typography>
            {data?.topPages?.length > 0 ? (
              data?.topPages?.map((page, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    p: 1,
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "rgba(115, 103, 240, 0.1)",
                    },
                  }}
                >
                  <Typography
                    component="a"
                    href={page.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {page.page}
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    {page.visits} visits
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                No page data available
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Top Locations Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "#7367f033",
              borderRadius: "16px",
              p: 3,
              height: "100%",
              border: "1px solid #7367f033",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: 600, color: "#fff", mb: 2 }}
            >
              Top Locations
            </Typography>
            {data?.topLocations?.length > 0 ? (
              data?.topLocations?.map((location, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    p: 1,
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "rgba(115, 103, 240, 0.1)",
                    },
                  }}
                >
                  <Typography sx={{ color: "#fff" }}>
                    {location.location}
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    {location.count} visits
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                No location data available
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Top Traffic Sources Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor: "#7367f033",
              borderRadius: "16px",
              p: 3,
              height: "100%",
              border: "1px solid #7367f033",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: 600, color: "#fff", mb: 2 }}
            >
              Top Traffic Sources
            </Typography>
            {data?.topTrafficSources?.length > 0 ? (
              data?.topTrafficSources?.map((source, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    p: 1,
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "rgba(115, 103, 240, 0.1)",
                    },
                  }}
                >
                  <Typography sx={{ color: "#fff" }}>
                    {source.source}
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    {source.count} visits
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                No traffic source data available
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

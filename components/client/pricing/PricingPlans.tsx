"use client";

import React, { useEffect, useState } from "react";
import { PRICING_PLANS } from "@/constants";
import useSubscription from "@/hooks/client/use-subscription";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Removed
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
// import { useRouter } from "next/navigation"; // Removed
import Navbar from "@/components/shared/ui/navbar";
import generalService from "@/services/api/general-service";
import planServices from "@/services/api/client/plans-services";
import jwtService from "@/services/local/jwt-service";
import toast from "react-hot-toast";
import { CLIENT_DASHBOARD_ROUTE } from "@/core/routes";
import { useRouter } from "next/navigation";

interface IPlanCard {
  planName: string;
  planAmount: number;
  features: string[];
  isCreatingCheckoutSession: boolean;
  onPurchase: () => void;
  isPopular?: boolean;
}

const Heading = () => {
  return (
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          fontWeight: 800,
          color: "#ffffff",
          mb: 2,
        }}
      >
        Choose Your{" "}
        <span
          style={{
            background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradientShift 8s ease infinite",
          }}
        >
          Plan
        </span>
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "1.1rem", md: "1.25rem" },
          color: "rgba(255, 255, 255, 0.7)",
          maxWidth: "800px",
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        Select the plan that best suits your business needs. All plans include
        our core features and 24/7 support.
      </Typography>
    </Box>
  );
};

const PlanCard = ({
  planName = "",
  planAmount = 0,
  features = [],
  isCreatingCheckoutSession,
  onPurchase,
  isPopular,
}: IPlanCard) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        padding: "40px",
        flexDirection: "column",
        borderRadius: "32px",
        background: "rgba(30, 30, 50, 0.4)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(115, 103, 240, 0.2)",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-12px)",
        },
        "&::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
        },
      }}
    >
      {/* Gradient Border */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          padding: "1px",
          borderRadius: "32px",
          background: isPopular
            ? "linear-gradient(135deg, #ffffff, #808080, #ffffff)"
            : "linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(255,255,255,0.05))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <Box>
        <img src="/object1.svg" alt="" />
      </Box>

      {/* Plan Name and Price */}
      <Box mt={3} sx={{ color: isPopular ? "white" : "black" }}>
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "500",

            background: isPopular
              ? "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)"
              : "white",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradientShift 8s ease infinite",
          }}
        >
          {planName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            color: "#fff",
          }}
        >
          <Typography sx={{ fontWeight: "500", fontSize: "48px" }}>
            ${planAmount}
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
            /month
          </Typography>
        </Box>
      </Box>
      {/* Purchase Button */}
      <Button
        variant="contained"
        onClick={onPurchase}
        disabled={isCreatingCheckoutSession}
        sx={{
          background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 8s ease infinite",
          fontSize: "0.95rem",
          py: 1,
          px: 3,
          boxShadow: "0 4px 15px rgba(115, 103, 240, 0.4)",
          borderRadius: "10px",
          color: "#fff",
          textTransform: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
          mb: 2,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "&:hover": {
            boxShadow: "0 6px 20px #7367f099",
            transform: "translateY(-3px)",
          },
        }}
      >
        {isCreatingCheckoutSession ? "Processing..." : "Get Started"}
      </Button>
      <Divider sx={{ backgroundColor: isPopular ? "#7267f0" : "#EDEDED" }} />
      {/* Features List */}
      <Box mt={4}>
        <Typography
          mb={2}
          sx={{ color: isPopular ? "#ffffff" : "rgb(255, 255, 255)" }}
        >
          Features
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {features.map((feature, i) => (
            <Box
              key={i}
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <CheckCircleIcon
                sx={{
                  color: isPopular ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                  fontSize: "1.25rem",
                }}
              />
              <Typography
                sx={{ color: isPopular ? "#ffffff" : "rgb(255, 255, 255)" }}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const PricingPlans = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const [activatingPlanId, setActivatingPlanId] = useState<string | null>(null);
  const router = useRouter();
  const getpackages = async () => {
    setLoading(true);
    const response = await generalService.getPackages();
    setLoading(false);

    if (response.success) {
      setPackages(response?.data);
    } else {
      setMessage(response.message || "Something went wrong");
      setSeverity("error");
    }
  };

  const handleActivatePlan = async (planId: string) => {
    try {
      setActivatingPlanId(planId);
      const authSession = jwtService.getAuthSession();
      console.log(authSession);

      if (!authSession?.token) {
        toast.error("Please login to activate a plan");
        return;
      }

      const response = await planServices.activatePlan({
        clientId: authSession.user.userId,
        packageId: planId,
      });
      console.log(response);

      if (response.success) {
        toast.success("Plan activated successfully");
        // Refresh the page or update the UI as needed
        router.push(CLIENT_DASHBOARD_ROUTE);
      } else {
        toast.error(response.message || "Failed to activate plan");
      }
    } catch (error) {
      toast.error("An error occurred while activating the plan");
    } finally {
      setActivatingPlanId(null);
    }
  };

  useEffect(() => {
    getpackages();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0A0F1E",
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 16 },
      }}
    >
      <Container maxWidth="lg">
        <Heading />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
            mt: 8,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "500px",
              }}
            >
              <CircularProgress size={32} />
            </Box>
          ) : packages?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "500px",
                gridColumn: "1 / -1",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "white", textAlign: "center" }}
              >
                Packages are not available at the moment. Please check back
                later.
              </Typography>
            </Box>
          ) : (
            <>
              {packages?.map((plan, i) => (
                <PlanCard
                  key={plan._id}
                  features={plan.offers}
                  planAmount={plan.price}
                  planName={plan.name}
                  onPurchase={() => handleActivatePlan(plan._id)}
                  isCreatingCheckoutSession={activatingPlanId === plan._id}
                  isPopular={i === 1}
                />
              ))}
            </>
          )}
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: 10,
            maxWidth: "700px",
            mx: "auto",
            p: 4,
            borderRadius: "12px",
            background: "linear-gradient(45deg, #7367f0 30%, #ce9ffc 90%)",
            boxShadow: "0 8px 20px rgba(115, 103, 240, 0.4)",
            border: "1px solid #333",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#fff",
              mb: 2,
            }}
          >
            Need a Custom Plan?
          </Typography>
          <Typography
            sx={{
              color: "#ffffff",
              mb: 3,
              fontSize: "1rem",
            }}
          >
            We offer tailored solutions for enterprises. Contact our team to
            create a plan that fits your needs.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#fff",
              color: "#fff",
              borderRadius: "10px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#222",
                borderColor: "#ccc",
              },
            }}
            component={Link}
            href="/contact"
          >
            Contact Sales
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingPlans;

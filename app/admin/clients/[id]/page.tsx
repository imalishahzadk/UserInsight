"use client";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ClientHeader from "./components/ClientHeader";
import UsageStatistics from "./components/UsageStatistics";
import CurrentPackage from "./components/CurrentPackage";
import MostUsedAgents from "./components/MostUsedAgents";
import RecentTransactions from "./components/RecentTransactions";
import PageSpinner from "@/components/shared/PageSpinner";
import clientService from "@/services/api/user/client-service";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import planServices from "@/services/api/client/plans-services";

export default function ClientDetailPage() {
  const router = useRouter();
  const { id: clientId } = useParams();

  const { data, isFetching, error } = useQuery({
    queryKey: ["client-details", clientId],
    queryFn: () => clientService.getClientDetails(clientId),
    refetchOnWindowFocus: false,
  });

  const { data: planData, isFetching: isPlanFetching } = useQuery({
    queryKey: ["client-plan", clientId],
    queryFn: () => planServices.getActivePlan(clientId as string),
    refetchOnWindowFocus: false,
  });

  const { data: purchaseHistory, isFetching: isPurchaseHistoryFetching } =
    useQuery({
      queryKey: ["purchase-history", clientId],
      queryFn: () => planServices.getPurchaseHistory(clientId as string),
      refetchOnWindowFocus: false,
    });

 

  if (isFetching || isPlanFetching || isPurchaseHistoryFetching) {
    return <PageSpinner />;
  }

  if (error || !data) {
    return <></>;
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#0A0F1E" }}>
      <ClientHeader
        stats={{
          totalBots: data.data?.stats?.totalBots ?? 0,
          activeBots: data.data?.stats?.activeBots ?? 0,
          lastLogin: data.data?.client?.lastLogin
            ? format(
                parseISO(data.data.client.lastLogin),
                "dd/MM/yyyy hh:mm aa"
              )
            : "",
        }}
        clientDetails={data.data.client}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 3,
          mb: 3,
          "& > *": {
            minHeight: "400px",
          },
        }}
      >
        <UsageStatistics clientId={clientId as string} />
        <CurrentPackage planData={planData?.data} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <MostUsedAgents clientId={clientId as string} />
      </Box>

      <Box>
        <RecentTransactions purchaseHistory={purchaseHistory?.data} />
      </Box>
    </Box>
  );
}

import PageSpinner from "@/components/shared/PageSpinner";
import useNotification from "@/hooks/shared/use-notification";
import agentService from "@/services/api/client/agent-service";
import { QueryClient, useQuery } from "@tanstack/react-query";

const getAgentInventories = async (agentId: string) => {
  const res = await agentService.getAgentInventories(agentId);

  if (res.success) {
    return res.data;
  } else {
    return [];
  }
};

const NoFeeds = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <h1 className="text-white font-bold text-2xl">No Feeds Found!</h1>
    </div>
  );
};

interface IFeedCardProps {
  url: string;
  isAdded: boolean;
  handleAddFeed: () => void;
}

const FeedCard = ({
  url = "",
  isAdded = false,
  handleAddFeed,
}: IFeedCardProps) => {
  return (
    <li className="border border-gray-200 text-white px-2 py-3 rounded-sm mb-2 flex items-center gap-4 justify-between">
      <p className="text-sm text-white">{url}</p>
      {isAdded ? (
        <span className="text-xs text-green-600 font-bold">Added</span>
      ) : (
        <button
          className="text-white  font-bold outline-none border px-3 py-1 rounded-md cursor-pointer text-xs"
          onClick={handleAddFeed}
        >
          Add
        </button>
      )}
    </li>
  );
};

interface IInventoryFeed {
  _id: string;
  inventoryUrl: string;
  isAdded: boolean;
}

const AddInventory = ({
  agentId,
  refetchKnowledge,
}: {
  agentId: string;
  refetchKnowledge: () => void;
}) => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["inventory-feed", agentId],
    queryFn: () => getAgentInventories(agentId),
    refetchOnWindowFocus: false,
  });

  const notification = useNotification();

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data || error) {
    return <NoFeeds />;
  }

  if (data.length <= 0) {
    return <NoFeeds />;
  }

  const handleAddFeed = async (inventoryFeedId: string) => {
    const res = await agentService.handleAddAgentInventory(
      agentId,
      inventoryFeedId
    );
    if (res.success) {
      notification.success(res.message);
      refetch();

      refetchKnowledge();
    } else {
      notification.error(res.message);
    }
  };

  return (
    <div className="my-20">
      <h2 className="font-bold text-white text-2xl">Add Inventory</h2>
      <ul className="my-5">
        {data.map((feed: IInventoryFeed) => (
          <FeedCard
            key={feed._id}
            isAdded={feed.isAdded}
            url={feed.inventoryUrl}
            handleAddFeed={() => handleAddFeed(feed._id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default AddInventory;

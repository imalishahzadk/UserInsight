"use client";

import Spinner from "@/components/shared/ui/Spinner";
import { CLIENT_MEETING_SCHEDULE_ROUTE } from "@/core/routes";
import { IClientPermissions } from "@/core/types/client";
import useNotification from "@/hooks/shared/use-notification";
import meetingService, { ISlot } from "@/services/api/client/meeting-service";
import { IRootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const NoSlots = () => {
  return (
    <p className="text-[rgba(255,255,255,0.7)] font-medium">No Slots found!</p>
  );
};

const AvailabelSlots = () => {
  const searchParams = useSearchParams();

  const refreshId = searchParams.get("refreshId");

  const { data, isFetching, error } = useQuery({
    queryKey: ["available-slots", refreshId],
    queryFn: () => meetingService.getAvailableSlots(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <Spinner />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <ul className="space-y-2">
      {data.map((slot: ISlot) => (
        <li
          key={slot._id}
          className="p-3 border border-[rgba(255,255,255,0.2)] rounded flex justify-between items-center bg-[#141c31] text-white transition-all hover:border-[rgba(0,229,255,0.3)]"
        >
          <span>
            {new Date(slot.start).toLocaleString()} -{" "}
            {new Date(slot.end).toLocaleTimeString()}
          </span>
        </li>
      ))}
      {data.length <= 0 && <NoSlots />}
    </ul>
  );
};

const ScheduledSlots = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["available-slots"],
    queryFn: () => meetingService.getScheduledSlots(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <Spinner />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <ul className="space-y-2">
      {data.map((slot: ISlot) => (
        <li
          key={slot._id}
          className="p-3 border border-[rgba(255,255,255,0.2)] rounded grid grid-cols-3 bg-[#141c31] text-white transition-all hover:border-[rgba(0,229,255,0.3)]"
        >
          <span>
            {new Date(slot.start).toLocaleString()} -{" "}
            {new Date(slot.end).toLocaleTimeString()}
          </span>
          <span className="text-[rgba(255,255,255,0.8)]">
            {slot.bookedBy.name}
          </span>
          <span className="text-[rgba(255,255,255,0.8)]">
            {slot.bookedBy.email}
          </span>
        </li>
      ))}

      {data.length <= 0 && <NoSlots />}
    </ul>
  );
};

export function MeetingScheduler() {
  const { permissions } = useSelector(
    (state: IRootState) => state.auth.user
  ) as { permissions: IClientPermissions };

  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [isAddingSlot, setIsAddingSlot] = useState<boolean>(false);

  const notification = useNotification();
  const router = useRouter();

  const addSlot = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!startTime || !endTime) {
      return alert("Please select start and end time.");
    }

    if (startTime < today) {
      return alert("Start time cannot be in the past");
    }
    if (startTime >= endTime) {
      return alert("End time must be after start time");
    }

    if (startTime >= endTime) return alert("End time must be after start time");

    const start = startTime.toISOString();
    const end = endTime.toISOString();

    setIsAddingSlot(true);
    const res = await meetingService.addSlot({ start, end });
    setIsAddingSlot(false);

    if (res.success) {
      notification.success(res.message);

      const refreshId = Date.now();

      router.push(`${CLIENT_MEETING_SCHEDULE_ROUTE}?refreshId=${refreshId}`);
    } else {
      notification.error(res.message);
    }
  };

  return (
    <div className="p-6 text-white bg-[#070b15] min-h-screen">
      <h1 className="text-2xl font-bold mb-10 text-white">
        Manage Available Slots
      </h1>
      {permissions?.meetingSlots?.add && (
        <div className="bg-[#0a0f1e] rounded-lg p-6 border border-[rgba(0,229,255,0.2)] transition-all hover:border-[rgba(0,229,255,0.4)] mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Add New Slot
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block mb-2 text-[rgba(255,255,255,0.7)]">
                Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date: Date | null) => setStartTime(date)}
                showTimeSelect
                dateFormat="Pp"
                className="p-2 border border-[rgba(0,229,255,0.2)] rounded bg-[#141c31] text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-[rgba(255,255,255,0.7)]">
                End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={setEndTime}
                showTimeSelect
                dateFormat="Pp"
                className="p-2 border border-[rgba(0,229,255,0.2)] rounded bg-[#141c31] text-white"
              />
            </div>
          </div>

          <button
            onClick={addSlot}
            className="bg-[#00e5ff] text-black font-medium px-4 py-2 rounded cursor-pointer min-w-[100px] hover:bg-[#00c8e0] transition-colors"
          >
            {isAddingSlot ? <Spinner size={18} /> : "Add Slot"}
          </button>
        </div>
      )}
      <div className="bg-[#0a0f1e] rounded-lg p-6 border border-[rgba(0,229,255,0.2)] transition-all hover:border-[rgba(0,229,255,0.4)] mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Available Slots
        </h2>
        <AvailabelSlots />
      </div>

      <div className="bg-[#0a0f1e] rounded-lg p-6 border border-[rgba(0,229,255,0.2)] transition-all hover:border-[rgba(0,229,255,0.4)]">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Meeting Scheduled
        </h2>
        <ScheduledSlots />
      </div>
    </div>
  );
}

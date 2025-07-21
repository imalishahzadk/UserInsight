import { FaStop } from "react-icons/fa6";
import { SlClose } from "react-icons/sl";
import { CircularProgress } from "@mui/material";

interface AudioRecorderProps {
  stopListening: () => void;
  cancelRecording: () => void;
  isSending: boolean;
  primaryColor: string;
  isDark: boolean;
}

const AudioRecorder = ({
  stopListening = () => {},
  cancelRecording = () => {},
  isSending = false,
  primaryColor = "#000000",
  isDark = false,
}: AudioRecorderProps) => {
  return (
    <div
      className="h-full max-h-[50px] md:max-h-full border px-2 py-1 xl:py-2 rounded-lg flex items-center justify-between gap-1"
      style={{
        backgroundColor: isDark ? "#0a0f1e" : "#ffffff",
        border: `1px solid ${primaryColor}33`,
      }}
    >
      <button
        className="outline-none cursor-pointer"
        type="button"
        onClick={cancelRecording}
        disabled={isSending}
        style={{
          opacity: isSending ? "0.7" : 1,
        }}
      >
        <SlClose
          className="text-lg"
          style={{
            color: primaryColor,
          }}
        />
      </button>

      <div
        className="flex items-center justify-center h-full space-x-[3px] bg-[#0A0F1E] rounded-lg"
        style={{
          width: isSending ? "50px" : "40%",
        }}
      >
        {isSending ? (
          <CircularProgress sx={{color:"#7367f0"}} size={18} thickness={4} />
        ) : (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, i) => (
            <span
              key={i}
              className={`wave-bar`}
              style={{
                animationDelay: `${i * 0.1}s`,
                backgroundColor: primaryColor,
              }}
            ></span>
          ))
        )}
      </div>

      <button
        className="outline-none cursor-pointer"
        onClick={stopListening}
        type="button"
        disabled={isSending}
        style={{
          opacity: isSending ? "0.7" : 1,
        }}
      >
        <FaStop
          className="text-xl"
          style={{
            color: primaryColor,
          }}
        />
      </button>
    </div>
  );
};

export default AudioRecorder;

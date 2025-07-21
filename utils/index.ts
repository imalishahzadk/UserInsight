import { ApiResponse } from "@/core/types";
import { clsx } from "clsx";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: any) => {
  return twMerge(clsx(inputs));
};

export const renderConditionalImage = (image: File | string | null) => {
  if (!image) return;

  if (image instanceof File) return URL.createObjectURL(image);
  else if (typeof image === "string") return image;
};

export const buildFormData = (
  formData: FormData,
  data: any,
  parentKey?: any
) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    if (parentKey) {
      formData.append(parentKey, value);
    }
  }
};

export const replaceUrlVariables = (str: string, params: any) => {
  const stripedText = str.replace(/{([^{}]+)}/g, (match, key: string) => {
    return params[key] !== undefined ? params[key] : "";
  });
  return stripedText;
};

export const hexToRGBA = (hex: string, alpha: string) => {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Helper function to format assistant messages.
 * - Converts `## Heading` into `<strong>Heading</strong>`.
 * - Replaces `\n\n` with proper line breaks.
 */

export const formatAssistantMessage = (message: string) => {
  if (!message) return "";

  return message
    .replace(/##\s*(.+)/g, "<strong>$1</strong>")
    .replace(/\n{2,}/g, "<br /><br />")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(
      /!\[([^\]]*)\]\((https?:\/\/[^\s]+)\)/g,
      '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin:4px 0px;border-radius:6px" />'
    ) //![Alt Text](URL) to <img>
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a style="font-weight:400;text-decoration:underline" href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
};

export const handleConfirm = async (
  callback: () => Promise<ApiResponse>,
  props?: { title?: string; text?: string }
) => {
  const result = await Swal.fire({
    title: props?.title ?? "Are you sure?",
    text: props?.text ?? "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await callback();
      if (res.success) {
        Swal.fire({
          title: "Deleted!",
          text: res.message,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: res.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  }
};

export const formatAmountWithCommas = (amount: number | null | undefined) => {
  if (!amount) return "$0";

  const formattedAmount = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${formattedAmount}`;
};

export const extractFirstName = (fullName: string | null | undefined) => {
  if (!fullName) return "";

  return fullName.trim().split(" ")[0];
};

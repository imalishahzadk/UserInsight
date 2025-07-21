import { cn } from "@/utils";
import React, { ReactNode, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IconInputProps extends React.ComponentProps<"input"> {
  icon: React.ReactNode;
}

interface WrapperProps {
  className?: string;
  children: ReactNode;
}

interface FieldErrorMsgProps {
  className?: string;
  name: string;
  errors: any;
}

const Label = ({ className = "", text = "", ...props }) => {
  return (
    <label className={cn("font-medium", className)} {...props}>
      {text}
    </label>
  );
};

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        className={cn(
          "w-full px-4 py-2 outline-none bg-gray-100 rounded-lg border-none focus:ring focus:ring-blue-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className = "", icon, ...props }, ref) => {
    return (
      <div className="flex items-center w-full outline-none bg-gray-100 rounded-lg border-none focus:ring focus:ring-blue-300">
        <div className="outline-none border-none px-2 py-2 bg-gray-200 rounded-l-lg">
          {icon}
        </div>

        <input
          className={cn(
            "outline-none bg-none border-none py-2 pl-1",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

IconInput.displayName = "IconInput";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className = "", ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center w-full outline-none bg-gray-100 rounded-lg border-none focus:ring focus:ring-blue-300">
      <button
        type="button"
        className="outline-none border-none px-2 py-2 bg-gray-200 rounded-l-lg"
        onClick={toggleVisibility}
      >
        {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </button>

      <input
        className={cn("outline-none bg-none border-none py-2 pl-1", className)}
        type={isVisible ? "text" : "password"}
        ref={ref}
        {...props}
      />
    </div>
  );
});

PasswordInput.displayName = "Input";

const FieldErrorMsg = ({
  name = "",
  className = "",
  errors,
}: FieldErrorMsgProps) => {
  return (
    <>
      {errors && errors[name] && (
        <p className={cn("text-sm text-red-600", className)}>
          {errors[name].message}
        </p>
      )}
    </>
  );
};

const InputFieldWrapper = ({ className = "", children }: WrapperProps) => {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
};

export {
  Input,
  InputFieldWrapper,
  Label,
  FieldErrorMsg,
  PasswordInput,
  IconInput,
};

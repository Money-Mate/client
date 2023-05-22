import { useEffect } from "react";

interface SuccessAlertProps {
  message: string | undefined;
  onClose: () => void;
}

function SuccessAlert(props: SuccessAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onClose();
    }, 500000);

    return () => clearTimeout(timer);
  }, [props.onClose]);

  return (
    <div

      className="m-5 rounded-lg p-3 text-sm bg-gray-800 text-green-400"


      role="alert"
    >
      <span className="font-medium">Ok!</span>
      {props.message && ` ${props.message}`}
    </div>
  );
}

export default SuccessAlert;

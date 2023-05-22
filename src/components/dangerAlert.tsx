import { useEffect } from "react";

interface DangerAlertProps {
  message: string | undefined;
  onClose: () => void;
}

function DangerAlert(props: DangerAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [props.onClose]);

  return (
    <div

      className="m-5 rounded-lg p-3 text-sm  bg-gray-800 text-red-400"

      role="alert"
    >
      <span className="font-medium">Sorry! Etwas ist schiefgegangen ...</span>
      {props.message && ` ${props.message}`}
    </div>
  );
}

export default DangerAlert;

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
      className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">Sorry! Etwas ist schiefgegangen ...</span>
      {props.message && ` ${props.message}`}
    </div>
  );
}

export default DangerAlert;

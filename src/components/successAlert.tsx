interface successAlertProps {
  message: string | undefined;
}

function successAlert(props: successAlertProps) {
  return (
    <div
      className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">Ok!</span>
      {props.message && ` ${props.message}`}
    </div>
  );
}

export default successAlert;

import { Button } from "antd";
import dataTime from "date-and-time";
import classNames from "classnames";

interface Props {
  className?: string;
  dataLoadText?: string;
  onReload: () => void;
}

const FailedApiReload: React.FC<Props> = ({
  className = "mt-24",
  onReload,
  dataLoadText = "Data load unsuccessful. Click Reload to try again.",
}) => {
  const date = dataTime.format(new Date(), "MM/DD/YYYY hh:mm:ss A");

  return (
    <div className={classNames("text-center", className)}>
      <p>{dataLoadText}</p>
      <p className="fs-12 mt-4">Failure ocurred on {date}</p>
      <Button type="primary" onClick={onReload} className="mt-8">
        Data load unsuccessful. Click Reload to try again.
      </Button>
    </div>
  );
};

export default FailedApiReload;

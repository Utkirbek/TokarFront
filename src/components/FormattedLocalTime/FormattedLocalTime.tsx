import "dayjs/locale/uz-latn";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React from "react";

interface FormattedLocalTimeProps {
  date: Date | string;
}

dayjs.extend(localizedFormat);

const FormattedLocalTime: React.FC<FormattedLocalTimeProps> = ({ date }) => {
  return <>{dayjs(date).locale("uz-latn").format("llll")}</>;
};

export default FormattedLocalTime;

export const formatedTime = (date: string, format?: string) => {
  if (format) return dayjs(date).locale("uz-latn").format(format);
  return dayjs(date).locale("uz-latn").format("MM/DD/YYYY");
};

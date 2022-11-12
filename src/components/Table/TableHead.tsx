import If from "@components/smart/If";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  data: {
    [key: string]: boolean;
  };
  prefix: string;
};

const TableHead: React.FC<Props> = ({ data, prefix }) => {
  return (
    <thead>
      <tr>
        {Object.keys(data)
          .filter(Boolean)
          .map((hd) => (
            <If condition={true} key={hd}>
              <th>
                <FormattedMessage id={`${prefix}.${hd}`} />
              </th>
            </If>
          ))}
      </tr>
    </thead>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.data === nextProps.data;
};

export default memo(TableHead, areEqual);

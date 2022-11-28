import If from "@components/smart/If";
import { Permissions } from "@utils/constants";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  data: {
    [key: string]: boolean;
  };
  prefix: string;
  permissionOf?:
    | "products"
    | "users"
    | "admins"
    | "orders"
    | "payments"
    | "no-check";
};

const TableHead: React.FC<Props> = ({ data, prefix, permissionOf }) => {
  return (
    <thead>
      <tr>
        {Object.keys(data)
          .filter(Boolean)
          .map((hd) => (
            <If
              hasPerm={
                permissionOf
                  ? // @ts-ignore
                    Permissions[permissionOf][hd]
                  : "no-check"
              }
              key={hd}>
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

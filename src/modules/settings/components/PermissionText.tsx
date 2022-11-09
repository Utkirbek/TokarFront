import { Text } from "@mantine/core";

type Props = {
  name: string;
};

const PermissionText = (props: Props) => {
  return <Text style={{marginTop:-5, textAlign:"center", color:"gray"}}>{props.name}</Text>;
};

export default PermissionText;

import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import useSettings from "@services/hooks/useSettings";
import { Permissions } from "@utils/constants";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";

import Roles from "./components/Roles";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

const Settings: NextPage = () => {
  const newPermRef = useRef<HTMLInputElement>(null);

  const { useFetchAllPermissions, addPermission } = useSettings();
  const permissionsQuery = useFetchAllPermissions();

  if (permissionsQuery.data?.length === 0) return <EmptyBox />;

  const handleNewPermissionClick = () => {
    openConfirmModal({
      title: "Yangi huquq qo'shish",
      children: (
        <TextInput
          label="Huquq nomi"
          placeholder="Huquq nomini kiriting"
          data-autofocus
          ref={newPermRef}
        />
      ),
      onConfirm: async () => {
        if (newPermRef.current?.value) {
          await addPermission({
            name: newPermRef.current?.value,
          });
          permissionsQuery.mutate();
        }
      },
      labels: {
        confirm: "Saqlash",
        cancel: "Bekor qilish",
      },
    });
  };

  return (
    <DashLayout>
      <WithLoading query={permissionsQuery}>
        <If hasPerm={Permissions.settings.view}>
          <h1>Ruxsat Etilgan Amallar</h1>
          <Grid>
            <Grid.Col span={3} lg={2} md={3} xs={12} sm={6}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleNewPermissionClick}
              >
                <Text>Yangi ruxsat</Text>
                <lord-icon
                  src="https://cdn.lordicon.com/zgogqkqu.json"
                  trigger="hover"
                  style={{
                    width: "1.6rem",
                    height: "1.6rem",
                    marginLeft: "auto",
                  }}
                ></lord-icon>
              </Card>
            </Grid.Col>
            {permissionsQuery.data?.map(
              (permission: { name: string; _id: string }) => (
                <Grid.Col
                  key={permission._id}
                  span={3}
                  lg={2}
                  md={3}
                  xs={12}
                  sm={6}
                >
                  <Card>
                    <Text>{permission.name}</Text>
                  </Card>
                </Grid.Col>
              )
            )}
          </Grid>
          <Roles />
        </If>
      </WithLoading>
    </DashLayout>
  );
};

export default Settings;

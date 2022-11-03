import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import { Card, Grid, Loader, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import useSettings from "@services/hooks/useSettings";
import { Permissions } from "@utils/constants";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

const Settings: NextPage = () => {
  const newPermRef = useRef<HTMLInputElement>(null);

  const { useGetAllPermissions, addPermission } = useSettings();
  const { data: permissions, error, mutate: refetch } = useGetAllPermissions();

  if (!permissions) return <Loader />;
  if (error) return <div>error</div>;
  if (permissions?.length === 0) return <EmptyBox />;

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
          refetch();
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
      <If hasPerm={Permissions.settings.view}>
        <h1>Ruxsat Etilgan Amallar</h1>
        <Grid>
          <Grid.Col span={3} lg={2} md={3} xs={12} sm={6}>
            <Card
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
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
          {permissions.map((permission: { name: string; _id: string }) => (
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
          ))}
        </Grid>
      </If>
    </DashLayout>
  );
};

export default Settings;

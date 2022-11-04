import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import useSettings from "@services/hooks/useSettings";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";

import Roles from "./components/Roles";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

const Settings: NextPage = () => {
  const newPermRef = useRef<HTMLInputElement>(null);

  const {
    useGetAllPermissions,
    addPermission,
    deletePermission,
    updatePermission,
  } = useSettings();
  const { data: permissions, error, mutate: refetch } = useGetAllPermissions();
  const permissionsQuery = useGetAllPermissions();

  if (permissionsQuery.data?.length === 0) return <EmptyBox />;

  const handleUPermissionAdd = () => {
    openConfirmModal({
      title: "Yangi huquq qo'shish",
      children: (
        <TextInput
          label="Huquq nomi"
          placeholder="Huquq nomini kiriting"
          data-autofocus
          ref={newPermRef}
          required
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

  const handlePermissionUpdate = (name: string, id: string) => {
    openConfirmModal({
      title: "Huquqni o'zgartirish.",
      children: (
        <TextInput
          label="Huquq nomini o'zgartirish"
          placeholder="Yangi huquq nomini kiriting"
          data-autofocus
          ref={newPermRef}
          required
          defaultValue={name}
        />
      ),
      onConfirm: async () => {
        await updatePermission({
          name: newPermRef.current?.value,
          id: id,
        });
        refetch();
      },
      labels: {
        confirm: "Saqlash",
        cancel: "Bekor qilish",
      },
    });
  };

  const handleDelete = async function (id: string) {
    deletePermission(id, {
      onSuccess: () => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Mahsulot o'chirilmoqda",
          message:
            "Bu malumot o'chirilgandan keyin qayta yuklashni iloji yo'q.Yangi mahsulot qo'shasiz",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
      onError: () => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Xatolik",
          message: "Xatolik Yoz berdi",
          autoClose: false,
          disallowClose: false,
        });
      },
    });
  };
  const openDeleteModal = (id: string) =>
    openConfirmModal({
      title: "Mahsulotni o'chirish",
      centered: true,
      children: (
        <Text size="sm">
          Siz bu mahsulotni chindanham o&apos;chirmoqchimisiz
        </Text>
      ),
      labels: { confirm: "O'chirish", cancel: "Orqaga qaytish" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleDelete(id);
        refetch();
      },
      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Hey there, your code is awesome! 🤥",
        });
      },
    });

  return (
    <DashLayout>
      <If hasPerm={Permissions.settings.view}>
        <h1>
          <FormattedMessage id="perm.allow" />
        </h1>
        <Grid>
          <Grid.Col span={3} lg={2} md={3} xs={12} sm={6}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                height: 95,
              }}
              onClick={handleUPermissionAdd}
            >
              <Text>
                <FormattedMessage id="perm.newAllow" />
              </Text>
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
                <IconPencil
                  onClick={() =>
                    handlePermissionUpdate(permission.name, permission._id)
                  }
                  cursor={"pointer"}
                  style={{
                    position: "absolute",
                    right: 20,
                    marginRight: 40,
                    marginBottom: 10,
                  }}
                />
                <IconTrash
                  onClick={() => openDeleteModal(permission._id)}
                  cursor={"pointer"}
                  style={{ marginLeft: 120, marginBottom: 10 }}
                />
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

import useUser from "@hooks/shared/useUser";
import { Table, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import adminFetchers from "@services/api/adminFetchers";
import { IconCheck, IconTrash } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { mutate, useSWRConfig } from "swr";

function TableCard() {
  const { mutate: deleteAdmin } = useSWRConfig();
  const { name, _id } = useUser();
  console.log(name);
  console.log(name);

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getAdmins, adminFetchers.getAdmins);

  if (error) return <div>yuklash xatosi</div>;
  if (!data) return <div>yuklanmoqda...</div>;

  const handleDelete = async function (id: string) {
    const res = await deleteAdmin(
      RequestQueryKeys.deleteAdmin,
      adminFetchers.deleteAdmin(id),
      {
        revalidate: true,
      }
    );
    updateNotification({
      id: "load-data",
      color: "teal",
      title: "Data was loaded",
      message:
        "Notification will close in 2 seconds, you can close this notification now",
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
    refetch();
    console.log(res);
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          {name} Ushbu ishchingiz sizni tizimdan o&apos;chib ketadi, bu ishni
          ortga qaytarib bo&apos;lmaydi, shunda ham ishonchingiz komilmi?
        </Text>
      ),
      labels: { confirm: "Tasdiqlash", cancel: "Bekor qilish" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        showNotification({
          id: "load-data",
          loading: true,
          title: "Loading your data",
          message: "dsklmqpoa",
          autoClose: false,
          disallowClose: true,
        });
        handleDelete(id);
      },

      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Hey there, your code is awesome! 🤥",
        });
      },
    });

  const rows = data.map((item: any) => {
    console.log(item._id);

    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>
          {/* <IconTrash
            onClick={() => openDeleteModal(item._id, item.name)}
            // onClick={() => handleDelete(item._id)}
            // onClick={() => openDeleteModal(item._id)}
            style={{ color: "red", cursor: "pointer" }}
          /> */}
          {item.name == name ? (
            <IconTrash style={{ color: "red", cursor: "no-drop" }} />
          ) : (
            <IconTrash
              onClick={() => openDeleteModal(item._id, item.name)}
              style={{ color: "red", cursor: "pointer" }}
            />
          )}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Ismi</th>
            <th>Elektron po&lsquo;chta</th>
            <th>Telefon nomeri</th>
            <th>o&lsquo;chirish va tahrirlash</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default TableCard;

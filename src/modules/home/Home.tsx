import useUser from "@hooks/shared/useUser";
import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import DashLayout from "@modules/layout/DashLayout";
import adminFetchers from "@services/api/adminFetchers";
import { IconCheck } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const Home = () => {
  const { name } = useUser();
  const openModal = () =>
    openConfirmModal({
      title: "Are you sure?",
      children: (
        <Text size="sm">
          {name} Ushbu ishchingiz sizni tizimdan o&apos;chib ketadi, bu ishni
          ortga qaytarib bo&apos;lmaydi, shunda ham ishonchingiz komilmi?
        </Text>
      ),
      labels: { confirm: "Tasdiqlash", cancel: "Bekor qilish" },
      onConfirm: () => {
        showNotification({
          id: "load-data",
          loading: true,
          title: "Loading your data",
          message:
            "Data will be loaded in 3 seconds, you cannot close this yet",
          autoClose: false,
          disallowClose: true,
        });

        setTimeout(() => {
          updateNotification({
            id: "load-data",
            color: "teal",
            title: "Data was loaded",
            message:
              "Notification will close in 2 seconds, you can close this notification now",
            icon: <IconCheck size={16} />,
            autoClose: 2000,
          });
        }, 3000);
      },
      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Hey there, your code is awesome! 🤥",
        });
      },
    });

  const { data, error } = useSWR(
    RequestQueryKeys.getAdmins,
    adminFetchers.getAdmins
  );

  if (error) return <div>ошибка загрузки</div>;
  if (!data) return <div>загрузка...</div>;

  console.log(data);

  return (
    <DashLayout>
      <Button onClick={openModal}>Udalit</Button>
    </DashLayout>
  );
};

export default Home;

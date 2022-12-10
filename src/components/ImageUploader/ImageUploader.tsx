import {
  Box,
  CSSObject,
  Group,
  Image,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import useImageUpload from "@services/hooks/useImageUpload";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  urlsRef: React.MutableRefObject<string[]>;
  sx?: CSSObject;
  dropzoneProps?: Partial<DropzoneProps>;
};

const ImageUploader: React.FC<Props> = ({ urlsRef, sx, dropzoneProps }) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const { uploadImage } = useImageUpload();

  const theme = useMantineTheme();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt="None"
      />
    );
  });

  useEffect(() => {
    if (files?.length > 0) {
      setStatus("loading");

      files.forEach((file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        uploadImage(formData, {
          onSuccess: (data) => {
            urlsRef.current = [...urlsRef.current, data.file];
            setStatus("done");
          },
          onError: (err) => {
            console.error(err);
            setStatus("idle");
          },
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <Box sx={sx}>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onReject={(files) => console.warn("rejected files", files)}
        onDrop={(files) => setFiles(files)}
        loading={status === "loading"}
        {...dropzoneProps}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 60, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={40}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="md" inline>
              <FormattedMessage id="imgUploader" />
            </Text>
          </div>
        </Group>
      </Dropzone>
      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </Box>
  );
};

export default ImageUploader;

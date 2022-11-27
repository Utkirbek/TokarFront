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
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import axios from "axios";
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

  const theme = useMantineTheme();

  const upload_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
  const upload_preset = process.env
    .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

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
        formData.append("upload_preset", upload_preset);
        axios({
          url: upload_url,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: formData,
        })
          .then((res) => {
            urlsRef.current = [...urlsRef.current, res.data.url];
            if (urlsRef.current.length === files.length) {
              setStatus("done");
            }
          })
          .catch((err) => {
            console.error(err);
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
        onDrop={setFiles}
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

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { uploadToLaolun } from "./data-access";

const useLaolunAudioUploadMutation = () => {
  return useMutation({
    mutationFn: uploadToLaolun,
  });
};

export default useLaolunAudioUploadMutation;

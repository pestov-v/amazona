import {useEffect} from "react";
import {useTextInputReturn} from "./useTextInput";

type tUseComparePasswordFields = {
  pass: useTextInputReturn;
  confirmPass: useTextInputReturn;
};

export const useComparePasswordFields = ({pass, confirmPass}: tUseComparePasswordFields) => {
  useEffect(() => {
    confirmPass.setIsEqualTo(pass.value);
  }, [pass, confirmPass]);

  useEffect(() => {
    pass.setIsEqualTo(confirmPass.value);
  }, [pass, confirmPass]);
};

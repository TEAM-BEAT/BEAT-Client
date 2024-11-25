import * as S from "./ManageCheckBox.styled";

export default function ManageCheckBox({}) {
  return (
    <S.CheckBoxWrapper>
      <S.CheckBox
        type="checkbox"
        // checked={checkedStatusList.includes(status)}
        // onChange={() => handleStatusCheck(status)}
      />
      {/* {checkedStatusList.includes(status) ? <S.SelectIcon /> : <S.UnSelectIcon />} */}
      <S.UnSelectIcon />
    </S.CheckBoxWrapper>
  );
}

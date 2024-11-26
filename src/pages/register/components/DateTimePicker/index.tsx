import { Button, Spacing } from "@components/commons";
import { DatePicker, RenewTimePicker } from "@components/index";
import { changeDateTime } from "@pages/register/utils";
import dayjs, { Dayjs } from "dayjs"; //
import { useEffect, useState } from "react";
import * as S from "./index.styled";

interface DateTimePickerProps {
  value: Dayjs | null | string;
  onChangeDateTime: (date: Dayjs) => void;
}

const DateTimePicker = ({ value, onChangeDateTime }: DateTimePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [step, setStep] = useState<"calendar" | "time">("calendar");
  const [dateTime, setDateTime] = useState({
    date: undefined,
    time: {
      hour: undefined,
      minute: undefined,
      isPM: false,
    },
  });
  const [displayDateTime, setDisplayDateTime] = useState("");

  useEffect(() => {
    if (!value) {
      return;
    }

    const date = dayjs(value).toDate();
    const hour = dayjs(value).hour();
    const isPM = hour >= 12;
    const hour12 = hour % 12 || 12;
    const minute = dayjs(value).minute();

    setDateTime({
      date,
      time: {
        hour: hour12,
        minute,
        isPM,
      },
    });

    setDisplayDateTime(changeDateTime(date, hour12, minute, isPM));
  }, [value]);

  const handleDate = (date: Date) => {
    setDateTime((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleStep = (type: "calendar" | "time") => {
    setStep(type);
  };

  const handleTimeChange = (type: "hour" | "minute" | "isPM", value: number | boolean) => {
    setDateTime((prev) => ({
      ...prev,
      time: {
        ...prev.time,
        [type]: value,
      },
    }));
  };

  const handleNextClick = () => {
    handleStep("time");
    setDisplayDateTime(changeDateTime(dateTime.date));
  };

  const handleComplete = () => {
    const formattedHour = (dateTime.time.hour % 12) + (dateTime.time.isPM ? 12 : 0);
    const dayjsObject = dayjs(dateTime.date)
      .hour(formattedHour)
      .minute(dateTime.time.minute)
      .second(0)
      .millisecond(0);

    onChangeDateTime(dayjsObject);

    handleStep("calendar");
    setShowPicker(false);
    setDisplayDateTime(
      changeDateTime(dateTime.date, dateTime.time.hour, dateTime.time.minute, dateTime.time.isPM)
    );
  };

  return (
    <S.Wrapper>
      <S.InputContainer role="input" onClick={() => setShowPicker(true)} $open={showPicker}>
        <S.Text $highlight={!!displayDateTime}>
          {displayDateTime || "날짜와 시간을 선택해주세요"}
        </S.Text>
        <S.CustomOpenPicker $open={true} />
      </S.InputContainer>

      {showPicker && (
        <>
          <S.Overlay onClick={() => setShowPicker(false)} />
          <div style={{ position: "relative" }}>
            <S.PickerContainer>
              {step === "calendar" && (
                <>
                  <DatePicker date={dateTime.date} onChangeDate={handleDate} />

                  <Spacing marginBottom="2.8" />
                  <Button
                    disabled={!dateTime.date}
                    variant={dateTime.date ? "primary" : "gray"}
                    onClick={handleNextClick}
                    size="large"
                  >
                    다음
                  </Button>
                </>
              )}

              {step === "time" && (
                <>
                  <RenewTimePicker
                    isPM={dateTime.time.isPM}
                    selectedHour={dateTime.time.hour}
                    selectedMinute={dateTime.time.minute}
                    onChangeTime={handleTimeChange}
                  />

                  <Spacing marginBottom="3.2" />
                  <S.ButtonGroup>
                    <Button size="small" variant="gray" onClick={() => handleStep("calendar")}>
                      이전
                    </Button>
                    <Button
                      size="small"
                      variant={
                        dateTime.time.hour === undefined || dateTime.time.minute === undefined
                          ? "gray"
                          : "primary"
                      }
                      disabled={
                        dateTime.time.hour === undefined || dateTime.time.minute === undefined
                      }
                      onClick={handleComplete}
                    >
                      완료하기
                    </Button>
                  </S.ButtonGroup>
                </>
              )}
            </S.PickerContainer>
          </div>
        </>
      )}
    </S.Wrapper>
  );
};

export default DateTimePicker;

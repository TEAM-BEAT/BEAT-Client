import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconEyeOff, IconEyeOn, IconSearch } from "@assets/svgs";
import * as S from "./MapInput.styled";
import { splitGraphemes } from "@utils/useInputFilter";
import _ from "lodash";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLatitudeLongitude: (latitude: string, longitude: string) => void;
  maxLength?: number;
  placeholder: string;
  narrow?: boolean;
  filter?: (value: string) => string;
  cap?: false | true;
  isDisabled?: boolean;
}

interface MapSearchResult {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const MapInput = ({
  type = "input",
  name,
  value = "",
  onChange,
  setLatitudeLongitude,
  maxLength,
  placeholder,
  narrow,
  filter,
  cap,
  isDisabled,
  inputMode,
  ...rest
}: TextFieldProps) => {
  const { kakao } = window;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value as string); // 현재 입력값
  const [places, setPlaces] = useState<MapSearchResult[]>([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isWarn, setIsWarn] = useState(false);
  const prevValueRef = useRef(value as string); // 이전 입력값
  const rafRef = useRef<number | null>(null); // requestAnimationFrame ID

  const ps = new kakao.maps.services.Places();

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      if (query) {
        ps.keywordSearch(query, (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            const temp = [];
            for (var i = 0; i < data.length; i++) {
              temp.push(data[i]);
              console.log(data);
            }
            setPlaces(temp);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            setPlaces(data);
          }
        });
      } else {
        setPlaces([]);
      }
    }, 200),
    []
  );

  const handleClickInput = () => {
    setIsDropDownOpen(true);
    setIsWarn(false);
  };

  const handleClickDeemed = () => {
    setIsDropDownOpen(false);
    if (prevValueRef.current === inputValue) {
      setIsWarn(true);
      setLatitudeLongitude("", "");
    }
  };

  useEffect(() => {
    setInputValue(value as string);
    prevValueRef.current = value as string;
  }, [value]);

  const handleOnInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current); // 이전 requestAnimationFrame이 있으면 취소
      }

      rafRef.current = requestAnimationFrame(() => {
        // 새로운 requestAnimationFrame 요청
        let filteredValue = newValue;
        if (filter) {
          filteredValue = filter(newValue); // 전체 값을 필터링
        }

        if (maxLength && splitGraphemes(filteredValue as string).length > maxLength) {
          filteredValue = splitGraphemes(filteredValue as string)
            .slice(0, maxLength)
            .join("");
        }

        const newEvent = {
          ...e,
          target: {
            ...e.target,
            name: name,
            value: filteredValue,
          },
        } as ChangeEvent<HTMLInputElement>;

        onChange(newEvent);
        prevValueRef.current = filteredValue; // 이전 입력 값을 현재 값으로 업데이트
        setInputValue(filteredValue); // 현재 입력값을 필터링된 값으로 업데이트
      });

      debouncedSearch(newValue);
    },
    [onChange, filter, maxLength, name]
  );

  return (
    <>
      {isDropDownOpen && <S.Deemed onClick={handleClickDeemed} />}
      <S.TextFieldLayout $narrow={narrow}>
        <S.TextFieldWrapper>
          <S.TextFieldInput
            $isDisabled={isDisabled}
            ref={inputRef}
            value={inputValue}
            name={name}
            onChange={handleOnInput}
            onClick={handleClickInput}
            placeholder={placeholder}
            $narrow={narrow}
            inputMode={inputMode}
            $isWarn={isWarn}
            {...rest}
          />
          <S.TextUnit>
            <IconSearch />
          </S.TextUnit>
        </S.TextFieldWrapper>
        {isWarn && <S.WarningText>검색 시 나오는 주소를 선택해주세요.</S.WarningText>}
        {maxLength && cap && (
          <S.TextCap>{`${splitGraphemes(value as string).length}/${maxLength}`}</S.TextCap>
        )}
        {isDropDownOpen &&
          (places.length > 0 ? (
            <S.SearchDropDownWrapper>
              {places.map((place, idx) => (
                <React.Fragment key={`search-place-${idx}`}>
                  <S.DropDownItem
                    onClick={() => {
                      setInputValue(place.road_address_name || place.address_name);
                      setIsDropDownOpen(false);
                      setIsWarn(false);
                      // 추가: onChange 호출로 부모 상태 갱신
                      const newEvent = {
                        target: {
                          name,
                          value: place.road_address_name || place.address_name,
                        },
                      } as React.ChangeEvent<HTMLInputElement>;
                      onChange(newEvent);
                      setLatitudeLongitude(place.y, place.x); //lat이 y값
                    }}
                  >
                    <S.RoadName>{place.place_name}</S.RoadName>
                    <S.PostName>{place.road_address_name}</S.PostName>
                  </S.DropDownItem>
                  {idx !== places.length - 1 && <S.Divider />}
                </React.Fragment>
              ))}
            </S.SearchDropDownWrapper>
          ) : (
            <S.DescriptionBox>
              <S.NoSearchP>검색결과가 없어요. 아래와 같이 검색해보세요.</S.NoSearchP>
              <S.NoSearchB>
                {"• 도로명 + 건물번호 (판교역로 166)"}
                <br />
                {"• 동/읍/면/리 + 번지 (백현동 532)"}
                <br />
                {"• 건물명, 아파트명 (분당 주공)"}
              </S.NoSearchB>
            </S.DescriptionBox>
          ))}
      </S.TextFieldLayout>
    </>
  );
};

export default MapInput;

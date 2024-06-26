module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    eqeqeq: "error", // 항상 일치 연산자(=== 및 !==) 사용을 강제
    curly: "error", // 제어문에서 항상 중괄호 사용을 강제
    quotes: ["error", "double"], // 문자열은 항상 이중 따옴표로 설정
    "comma-style": ["error", "last"], // 쉼표 스타일을 (객체에서)마지막 요소 뒤에 사용하도록 설정
    "no-unused-vars": "warn", // 사용되지 않는 변수에 대한 경고 표시
    "no-console": "warn", // console 사용 시 경고 표시
    "no-extra-semi": "error", // 추가적인 세미콜론 사용을 방지
    "no-unused-expressions": "error", // 사용되지 않는 표현식에 대한 경고 표시
    indent: ["error", 2], // 들여쓰기는 두 칸으로 설정
    semi: ["warn", "always"], // 항상 세미콜론 사용을 적극 권장
    "no-undef": "error", // 정의되지 않은 변수에 대한 경고 표시
    "no-trailing-spaces": "warn", // 줄 끝에 공백 사용을 방지
    "no-multiple-empty-lines": "warn", // 연속된 빈 줄 사용을 방지
    "arrow-spacing": "warn", // 화살표 함수의 화살표 주변에 공백 사용을 강제
    "no-const-assign": "error", // const 변수에 재할당을 방지
    //"no-extra-parens": "warn", // 불필요한 괄호 사용을 방지
    "no-multi-spaces": "error", // 연속된 공백 사용을 방지
    "prefer-const": "error", // 변수 재할당을 하지 않는 경우 const 사용을 권장
    "no-else-return": "warn", // else 블록에서 return 사용을 방지
    "no-floating-decimal": "error", // 소수점 앞에 있는 0 생략을 방지
    "no-new-object": "error", // Object 생성자 사용을 방지
    "no-shadow": "error", // 외부 범위에서 이미 선언된 변수와 동일한 이름의 변수를 선언하는 것을 방지
    "no-param-reassign": "error", // 함수 매개변수의 재할당을 방지
    "prefer-template": "warn", // 문자열 연결 대신 템플릿 리터럴 사용을 권장
    radix: "error", // parseInt() 함수 사용 시 진수를 명시적으로 지정하도록 강제
    "no-useless-constructor": "error", // 불필요한 생성자 사용을 방지
    "no-alert": "warn", // alert() 함수 사용을 방지
    "no-empty-pattern": "warn", // 빈 객체나 배열 분해 사용을 방지
    "no-eval": "error", // eval() 함수 사용을 방지
    "no-implicit-globals": "error", // 암묵적인 전역 변수 사용을 방지
    "no-implied-eval": "error", // 암시적인 eval() 사용을 방지
    "no-loop-func": "error", // 루프 내에서 함수 선언을 방지
    "no-iterator": "error", // __iterator__ 속성 사용을 방지
    "no-new-wrappers": "error", // 기본 객체 래퍼 클래스 사용을 방지
    "no-restricted-globals": "error", // 특정한 전역 변수 사용을 방지
    "no-return-assign": "warn", // 할당문을 리턴문에서 사용을 방지
  },
};

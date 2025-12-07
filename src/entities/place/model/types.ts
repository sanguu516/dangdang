export interface DetailCommon {
  contentid: string;
  title: string;
  overview: string; // 개요 (HTML 태그 포함 가능)
  homepage?: string; // 홈페이지 URL
  addr1: string;
  mapx: string;
  mapy: string;
}

export interface DetailIntro {
  opentime?: string; // 영업시간/이용시간
  restdate?: string; // 휴무일
  parking?: string; // 주차 시설 정보
  chkcreditcard?: string; // 신용카드 가능 여부
  infocenter?: string; // 문의 및 안내
  // 숙박(32)인 경우 추가 필드
  checkintime?: string; // 입실 시간
  checkouttime?: string; // 퇴실 시간
  reservationurl?: string; // 예약 URL
  roomcount?: string; // 객실 수
  // 음식점(39)인 경우 추가 필드
  treatmenu?: string; // 취급 메뉴
  packing?: string; // 포장 가능 여부
}

export interface DetailPetTour {
  acmpyTypeCd?: string; // 동반 유형 (예: 전구역 동반가능, 실외만 가능)
  acmpyPsblCpam?: string; // 동반 가능 동물 (예: 전 견종, 소형견만)
  acmpyNeedMtr?: string; // 동반 시 필요사항 (예: 목줄 착용, 입마개)
  etcAcmpyInfo?: string; // 기타 동반 정보 (예: 배변봉투 지참 필수)
  relaPosesFclty?: string; // 관련 구비 시설 (예: 펫러닝, 펫수영장)
  relaFrnshPrdlst?: string; // 비치 품목
  relaAcdntRiskMtr?: string; // 사고 대비 사항
}

export interface DetailImage {
  originimgurl: string; // 원본 URL
  smallimageurl: string; // 썸네일 URL
  imgname?: string; // 이미지 제목
}

// ⭐ [최종] 앱 내부에서 사용할 통합 상세 객체
export interface TourSpotDetail {
  basicInfo: DetailCommon;
  introInfo: DetailIntro;
  petInfo: DetailPetTour;
  images: DetailImage[];
}

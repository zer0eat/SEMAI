import React, {useCallback, useState} from 'react';
import {Form, useLoaderData, useSearchParams, useSubmit} from "react-router-dom";
import styled from "styled-components";

import {ReportLoaderType, ReportObjectType} from "../_utils/Types";
import {useBodyScrollLock} from "../_hooks/useBodyScrollLock";
import useDate from "../_hooks/useDate";

import { Button, SemesButton } from "../components/ButtonComponents";
import ReportTable from "../components/ReportPage/ReportTable";
import Title from "../components/Title";
import ReportModal from "../components/DetailModal/ReportModal";
import PaginationComponents from "../components/ReportPage/PaginationComponents";
import InputOhtSn from "../components/ReportPage/InputOHTSn";
import {InputEndDate, InputStartDate} from "../components/ReportPage/InputDate";
import InputTime from "../components/ReportPage/InputTime";
import InputWheelPosition from "../components/ReportPage/InputWheelPosition";
import InputDescFlag from "../components/ReportPage/InputDescFlag";
import InputErrorFlag from "../components/ReportPage/InputErrorFlag";

const ReportSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function ReportPage() {
  // ================ 초기 필요한 값들 ================
  let [query] = useSearchParams();
  let submit = useSubmit();
  let data = useLoaderData() as ReportLoaderType;
  let { result, totalPage } = data;

  let ohtSn = query.get('ohtSn') || "ALL";
  let time = query.get('time') || "ALL";
  let wheelPosition = query.get('wheelPosition') || "";
  let errorFlag = query.get('errorFlag') || "0";
  let descFlag = query.get('descFlag') || "0";

  // ================== 페이지네이션 ======================
  let paginationTotalPage = Math.ceil(totalPage/20);
  // let page = useRef<string>(query.get('page') || "1")
  let [page, setPage] = useState<string>(query.get('page') || "1");
  const handleClickPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(e.target.value);
    submit(e.currentTarget.form);
  }

  // =================== 달력 선택 관련 ===================
  let { todayFormat } = useDate();
  let todayDate = todayFormat();
  let [startDate, setStartDate] = useState<string>(query.get('startDate') || todayDate);
  let [endDate, setEndDate] = useState<string>(query.get('endDate') || todayDate);
  /** 달력에서 날짜를 클릭하면 변하는 함수 */
  const handleChangeStartDate = (e:any) => {
    setStartDate(e.target.value);
  }
  const handleChangeEndDate = (e:any) => {
    setEndDate(e.target.value);
  }

  // =================== 모달 관련 ===================
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [scrollY, setScrollY] = useState<number>(0);
  let [detailInfo, setDetailInfo] = useState<ReportObjectType>({wheelCheckDate: [2023, 5, 2, 4, 32, 10]});        // 선택한 레포트의 상세내역을 전달할 객체
  const { lockScroll, openScroll } = useBodyScrollLock();
  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback((detailInfo: ReportObjectType) => {
    setScrollY(window.scrollY);
    setIsModalOpen(true);
    setDetailInfo(detailInfo);
    lockScroll();
  }, [lockScroll])
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setDetailInfo({wheelCheckDate: [2023, 5, 2, 4, 32, 10]});
    openScroll();
  }, [openScroll]);

  // ================ form 제출 =================
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage("1");
    submit(e.currentTarget.form);
  }

  return (
    <ReportSection>

      { isModalOpen && <ReportModal scrollY={scrollY} detailInfo={detailInfo} handleModalClose={handleModalClose}  /> }

      <Title title="레포트" />
      <Form replace={true} method="GET" style={{height : "100%", display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
        <div>
          <div>
            <InputOhtSn />
            <InputStartDate startDate={startDate} endDate={endDate} handleChangeStartDate={handleChangeStartDate} />
            <InputEndDate startDate={startDate} endDate={endDate} todayDate={todayDate} handleChangeEndDate={handleChangeEndDate} />
            <InputTime startDate={startDate} endDate={endDate} time={time} />
            <InputWheelPosition wheelPosition={wheelPosition} />
            <InputDescFlag descFlag={descFlag} />
            <InputErrorFlag />
            <SemesButton onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} width="90px" height="100%" type="submit">조회하기</SemesButton>
          </div>
          <div>
            <Button width="90px" height="100%">CSV 출력</Button>
          </div>
        </div>

        { result.length ?
          <>
            <ReportTable handleModalOpen={handleModalOpen} />
            <PaginationComponents paginationTotalPage={paginationTotalPage} handleClickPage={handleClickPage} page={page} />
          </>
          :
          <NoData>데이터가 존재하지 않습니다.</NoData>
        }

      </Form>
    </ReportSection>
  );
}

export default ReportPage;
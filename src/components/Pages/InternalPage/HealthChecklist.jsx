import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/InternalPage/HealthChecklist.css';

function SavetheList({ formData }) {
  const handleSaveHealthData = async () => {
    try {
      const response = await axios.post('http://localhost:8080/savehealthdata', formData);
      console.log(response.data); // 서버로부터 받은 응답 확인
      alert('건강체크 결과가 저장되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('건강체크 결과저장에 실패했습니다.');
    }
  };

  return (
    <button onClick={handleSaveHealthData} className="save-button_checklist"></button>

  );
}

const HealthChecklist = ({ goToMenu, username, password }) => {
  const questions1 = [
    {
      id: "1-1",
      question: '1. 하루 30분이상 근력 운동을 하십니까? (단순 걷기는 포함하지 않음)',
      options: ['주 3회 이상', '주 1-2회', '안함']
    },
    {
      id: "1-2",
      question: '2. 하루 30분이상 유산소 운동을 하십니까? 예) 걷기, 자전거타기, 스트레칭',
      options: ['주 3회 이상', '주 1-2회', '안함']
    },
    {
      id: "1-3",
      question: '3. 보조기구나 타인의 도움 없이 15분 이상 쉬지 않고 걸을 수 있습니까?',
      options: ['항상', '보통', '아니다']
    },
    {
      id: "1-4",
      question: '4. 평균 하루 물 섭취량은 어떻게 되십니까? 예) 1잔은 일반 컵 300ml 기준',
      options: ['1~2잔', '3-4잔', '5-6잔', '7잔 이상']
    },
    {
      id: "1-5",
      question: '5. 카페인이 함유된 음료의 하루 평균 섭취량은 어떻게 되십니까? 예) 커피, 차, 콜라',
      options: ['안 마심', '1~2잔', '3-4잔', '5-6잔', '7잔 이상']
    },
    {
      id: "1-6",
      question: '6. 달거나 짠 음식, 동물성 지방이 많은 음식을 자주 섭취 하십니까? 예) 돼지고기, 기름기 많은 음식',
      options: ['아니다', '가끔', '보통', '자주', '항상']
    },
    {
      id: "1-7",
      question: '7. 수면시간이 하루 7-9시간 정도 되십니까?',
      options: ['매일 주5-6일', '주 3-4일', '주 1-2일', '거의 없음']
    },
    {
      id: "1-8",
      question: '8. 전반적으로 당신의 건강상태는 어떤 편이십니까?',
      options: ['항상 좋다', '자주 좋다', '보통', '그저 그렇다', '나쁘다']
    },
    {
      id: "1-9",
      question: '9. 질병으로 처방받은 복용 약의 개수는 몇 개 십니까? 예) 고혈압, 관절염, 고지혈증, 당뇨약 등',
      options: ['없음', '1개', '2개', '3개', '4개 이상']
    },
    {
      id: "1-10",
      question: '10. 평소 흡연습관은 어떻게 되십니까?',
      options: ['피운 적 없다', '6개월 이상 금연', '6개월 미만 금연', '하루 한 갑 미만', '하루 한 갑 이상']
    }

  ];
  const questions2 = [
    {
      id: "2-1",
      question: '1. 당신은 기억력에 문제가 있습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-2",
      question: '2. 당신의 기억력은 10년 전에 비해 저하되었습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-3",
      question: '3. 당신은 기억력이 동년의 다른 사람들에 비해 나쁘다고 생각합니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-4",
      question: '4. 당신은 기억력 저하로 일상생활에 불편을 느끼십니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-5",
      question: '5. 당신은 최근에 일어난 일을 기억하는 것이 어렵습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-6",
      question: '6. 당신은 며칠 전에 나눈 대화 내용을 기억하는 것이 어렵습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-7",
      question: '7. 당신은 며칠 전에 한 약속을 기억하는 것이 어렵습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-8",
      question: '8. 당신은 친한 사람의 이름을 기억하기 어렵습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-9",
      question: '9. 당신은 물건 둔 곳을 기억하기 어렵습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-10",
      question: '10. 당신은 이전에 비해 물건을 자주 잃어버립니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-11",
      question: '11. 당신은 집 근처에서 길을 잃은 적이 있습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-12",
      question: '12. 당신은 가게에서 사려고 하는 두, 세가지 물건 이름을 기억하기 어렵습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-13",
      question: '13. 당신은 가스불이나 전기불 끄는 것을 기억하기 어렵습니까?',
      options: ['네', '아니요']
    },
    {
      id: "2-14",
      question: '14. 당신은 자주 사용하는 전화번호(자신 혹은 자녀의 집)를 기억하기 어렵습니까?',
      options: ['네', '아니요']
    }
  ];
  const questions3 = [
    {
      id: "3-1",
      question: '1. 예상했던 일이라 당황하지 않았던 적이 있었다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-2",
      question: '2. 중요한 일들을 내 맘대로 할 수 있었다는 느낌을 경험했다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-3",
      question: '3. 신경이 예민해지고 스트레스를 받고 있다는 느낌을 경험하지 않았던 적이 있었다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-4",
      question: '4. 꼭 해야 하는 일을 잘 처리할 수 있다고 생각한 적이 있었다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-5",
      question: '5. 평소의 일들이 내 생각대로 진행되고 있다는 느낌을 경험했다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-6",
      question: '6. 개인적인 문제를 처리하는 데 자신감을 느꼈다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-7",
      question: '7. 최상의 컨디션이라는 느낌을 경험했다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-8",
      question: '8. 일상생활에서 짜증을 잘 다스릴 수 있었다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-9",
      question: '9. 통제할 수 없는 일 때문에 화가 난 경험을 했다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    },
    {
      id: "3-10",
      question: '10. 어려운 일들이 많이 쌓여 해결하지 못할 것 같은 느낌을 경험했다.',
      options: ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다']
    }
  ];
  const questions4 = [
    {
      id: "4-1",
      question: '1. 나는 질병을 가지고 있거나, 먹는 음식의 양이나 종류를 변화시키는 상태이다.',
      options: ['네', '아니요']
    },
    {
      id: "4-2",
      question: '2. 나는 하루에 2번 이하로 식사한다.',
      options: ['네', '아니요']
    },
    {
      id: "4-3",
      question: '3. 나는 과일, 채소나 유제품을 거의 먹지 않는다.',
      options: ['네', '아니요']
    },
    {
      id: "4-4",
      question: '4. 나는 술을 일주일에 3번이상 마신다.',
      options: ['네', '아니요']
    },
    {
      id: "4-5",
      question: '5. 나는 치아와 구강문제를 가지고 있어서 먹는데 어려움을 느낀다.',
      options: ['네', '아니요']
    },
    {
      id: "4-6",
      question: '6. 나는 반찬을 골고루 먹지 않는다.',
      options: ['네', '아니요']
    },
    {
      id: "4-7",
      question: '7. 나는 거의 매번 혼자 식사한다.',
      options: ['네', '아니요']
    },
    {
      id: "4-8",
      question: '8. 나는 하루에 먹는약의 종류가 3가지 이상이다.',
      options: ['네', '아니요']
    },
    {
      id: "4-9",
      question: '9. 나는 6개월내에 4~5키로의 몸무게가 늘었거나 빠졌다.',
      options: ['네', '아니요']
    },
    {
      id: "4-10",
      question: '10. 나는 혼자 요리하거나 식사하는 것이 어렵다.',
      options: ['네', '아니요']
    }
  ];
  const questions5 = [
    {
      id: "5-1",
      question: '1. 평상시에는 아무렇지도 않던 일들이 귀찮게 느껴졌다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-2",
      question: '2. 먹고싶지 않았다, 입맛이 없었다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-3",
      question: '3. 가족이나 친구가 도와주더라도 울적한 기분을 떨쳐버릴 수 없었다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-4",
      question: '4. 다른 사람들만큼의 능력이 없다고 느꼈다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-5",
      question: '5. 무슨 일을 하든 정신을 집중하기가 힘들었다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-6",
      question: '6. 우울했다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-7",
      question: '7. 하는 일마다 힘들게 느껴졌다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-8",
      question: '8. 미래에 대하여 절망적으로 느꼈다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-9",
      question: '9. 내 인생은 실패작이라는 생각이 들었다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-10",
      question: '10. 두려움을 느꼈다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-11",
      question: '11. 잠을 설쳤다, 잠을 잘 이루지 못했다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-12",
      question: '12. 불행했다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-13",
      question: '13. 평소보다 말을 적게 했다, 말수가 줄었다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-14",
      question: '14. 세상에 홀로 있는 듯 한 외로움을 느꼈다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-15",
      question: '15. 사람들이 나에게 차갑게 대하는 것 같았다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-16",
      question: '16. 생활이 즐겁지 않았다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-17",
      question: '17. 갑자기 울음이 나왔다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-18",
      question: '18. 슬픔을 느꼈다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-19",
      question: '19. 사람들이 나를 싫어하는 것 같았다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    },
    {
      id: "5-20",
      question: '20. 도무지 무엇을 시작할 기운이 나지 않았다.',
      options: ['전혀 없었다', '1-2번 있었다', '3-4번 있었다', '5-7번 있었다']
    }
  ];
  const [exist, setExist] = useState(0);
  const [created_at, setcreated_at] = useState(0);
  const fetchUserhealthdata = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/healthdatauser?username=${username}`);
      if (response.data.length === 0) {
        return;
      }

      const userHealthData = response.data[0];
      setScores({
        healthStatus: userHealthData.healthstate,
        memoryStatus: userHealthData.memorystate,
        stressStatus: userHealthData.stressstate,
        nutritionStatus: userHealthData.nutritionstate,
        depressionStatus: userHealthData.depressionstate,
        healthScore: userHealthData.healthscore,
        memoryScore: userHealthData.memoryscore,
        stressScore: userHealthData.stressscore,
        nutritionScore: userHealthData.nutritionscore,
        depressionScore: userHealthData.depressionscore
      });
      setcreated_at(userHealthData.created_at)
      setExist(1);
    } catch (error) {
      console.error('사용자 건강 데이터를 가져오는 중 에러 발생:', error);
    }

  }
  useEffect(() => {
    fetchUserhealthdata();
  }, []);
  const [formData, setFormData] = useState({
    username: username,
    password: password,
    healthchecklist: [] // 저장할 배열 추가
  });
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({
    healthStatus: '',
    memoryStatus: '',
    stressStatus: '',
    nutritionStatus: '',
    depressionStatus: '',
    healthScore: '',
    memoryScore: '',
    stressScore: '',
    nutritionScore: '',
    depressionScore: ''
  });

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('ko-KR', options);
  }

  const formattedDate = formatDate(created_at);

  const calculateScores = () => {
    // 각 문항의 점수 계산
    let healthScore = 0;
    let memoryScore = 0;
    let stressScore = 0;
    let nutritionScore = 0;
    let depressionScore = 0;

    // 건강 점수 계산
    questions1.forEach((question) => {
      let optionScore = '';
      if (answers[question.id] === "주 3회 이상" ||
        answers[question.id] === "항상" ||
        answers[question.id] === "7잔 이상" ||
        answers[question.id] === "매일 주5-6일" ||
        answers[question.id] === "항상 좋다" ||
        answers[question.id] === "4개 이상" ||
        answers[question.id] === "피운 적 없다") {
        optionScore = 4;
      }
      else if (answers[question.id] === "5-6잔" ||
        answers[question.id] === "자주" ||
        answers[question.id] === "주 3-4일" ||
        answers[question.id] === "자주 좋다" ||
        answers[question.id] === "3개" ||
        answers[question.id] === "6개월 이상 금연") {
        optionScore = 3;
      }
      else if (answers[question.id] === "주 1-2회" ||
        answers[question.id] === "보통" ||
        answers[question.id] === "3-4잔" ||
        answers[question.id] === "주 1-2일" ||
        answers[question.id] === "2개" ||
        answers[question.id] === "6개월 미만 금연") {
        optionScore = 2;
      }
      else if (answers[question.id] === "1~2잔" ||
        answers[question.id] === "가끔" ||
        answers[question.id] === "그저 그렇다" ||
        answers[question.id] === "1개" ||
        answers[question.id] === "하루 한 갑 미만") {
        optionScore = 1;
      }
      else if (answers[question.id] === "안함" ||
        answers[question.id] === "아니다" ||
        answers[question.id] === "1~2잔" ||
        answers[question.id] === "안 마심" ||
        answers[question.id] === "거의 없음" ||
        answers[question.id] === "나쁘다" ||
        answers[question.id] === "없음" ||
        answers[question.id] === "하루 한 갑 이상") {
        optionScore = 0;
      }
      healthScore += optionScore;
    });

    // 기억감퇴 점수 계산
    questions2.forEach((question) => {
      let optionScore = answers[question.id] === '네' ? 1 : 0;
      memoryScore += optionScore;
    });

    // 스트레스 점수 계산
    questions3.forEach((question) => {
      let optionScore = '';
      if (answers[question.id] === "전혀 없었다") {
        optionScore = 0;
      } else if (answers[question.id] === "거의 없었다") {
        optionScore = 1;
      } else if (answers[question.id] === "때때로 있었다") {
        optionScore = 2;
      } else if (answers[question.id] === "자주 있었다") {
        optionScore = 3;
      } else if (answers[question.id] === "매우 자주 있었다") {
        optionScore = 4;
      }
      stressScore += optionScore;
    });

    // 영양 점수 계산
    questions4.forEach((question) => {
      const optionScore = answers[question.id] === '네' ? 2 : 0;
      nutritionScore += optionScore;
    });

    // 우울 점수 계산
    questions5.forEach((question) => {
      let optionScore = '';
      if (answers[question.id] === "전혀 없었다") {
        optionScore = 0;
      } else if (answers[question.id] === "1-2번 있었다") {
        optionScore = 1;
      } else if (answers[question.id] === "3-4번 있었다") {
        optionScore = 2;
      } else if (answers[question.id] === "5-7번 있었다") {
        optionScore = 3;
      }
      depressionScore += optionScore;
    });

    // 건강 상태 판단
    let healthStatus = '';
    if (healthScore >= 1 && healthScore <= 30) {
      healthStatus = '건강상태 의심';
    } else if (healthScore >= 31 && healthScore <= 35) {
      healthStatus = '건강상태 적신호';
    } else if (healthScore >= 36 && healthScore <= 40) {
      healthStatus = '보통(노력 필요)';
    } else if (healthScore >= 41 && healthScore <= 50) {
      healthStatus = '정상(지속 유지 필요)';
    }
    let memoryStatus = '';
    if (memoryScore >= 0 && memoryScore <= 5) {
      memoryStatus = '정상';
    } else if (memoryScore > 5) {
      memoryStatus = '경도인지장애';
    }
    let stressStatus = '';
    if (stressScore >= 0 && stressScore <= 13) {
      stressStatus = '정상';
    } else if (stressScore >= 14 && stressScore <= 24) {
      stressStatus = '경도';
    } else if (stressScore >= 25) {
      stressStatus = '고위험';
    }
    let nutritionStatus = '';
    if (nutritionScore >= 0 && nutritionScore <= 2) {
      nutritionStatus = '정상';
    } else if (nutritionScore >= 3 && nutritionScore <= 5) {
      nutritionStatus = '경도';
    } else if (nutritionScore >= 6) {
      nutritionStatus = '고위험';
    }
    let depressionStatus = '';
    if (depressionScore >= 0 && depressionScore <= 20) {
      depressionStatus = '정상';
    } else if (depressionScore >= 21 && depressionScore <= 24) {
      depressionStatus = '경도';
    } else if (depressionScore >= 25) {
      depressionStatus = '고위험';
    }
    setScores({
      healthStatus: healthStatus,
      memoryStatus: memoryStatus,
      stressStatus: stressStatus,
      nutritionStatus: nutritionStatus,
      depressionStatus: depressionStatus,
      healthScore: healthScore,
      memoryScore: memoryScore,
      stressScore: stressScore,
      nutritionScore: nutritionScore,
      depressionScore: depressionScore
    });
    setFormData(prevFormData => ({
      ...prevFormData,
      healthchecklist: [healthScore, healthStatus, memoryScore, memoryStatus, stressScore, stressStatus, nutritionScore, nutritionStatus, depressionScore, depressionStatus]
    }));
    setShowResults(true);
  };



  if (showResults) {
    return (
      <div className="result-container">
        <div className="top-bar">
          <button className="main-menu-button-HC" onClick={() => { setShowResults(false); goToMenu(); }}></button>
          <button className="recheck-button" onClick={() => { setShowResults(false); setExist(0); }}>다시 설문</button>
          <SavetheList formData={formData} />
        </div>
        <div className='scroll-container'>
          <h1>건강 체크 결과</h1>
          <div className="result-item">건강 점수: {scores.healthScore}</div>
          <div className="result-item">건강 상태: {scores.healthStatus}</div>
          <div className="result-item">기억감퇴 점수: {scores.memoryScore}</div>
          <div className="result-item">기억감퇴 상태: {scores.memoryStatus}</div>
          <div className="result-item">스트레스 점수: {scores.stressScore}</div>
          <div className="result-item">스트레스 상태: {scores.stressStatus}</div>
          <div className="result-item">영양 점수: {scores.nutritionScore}</div>
          <div className="result-item">영양 상태: {scores.nutritionStatus}</div>
          <div className="result-item">우울 점수: {scores.depressionScore}</div>
          <div className="result-item">우울 상태: {scores.depressionStatus}</div>
        </div>
      </div>
    );
  }



  if (exist == 1) {
    return (
      <div className="result-container">
        <div className="top-bar">
          <button className="main-menu-button-HC" onClick={() => { setShowResults(false); goToMenu(); }}></button>
          <button className="menu-button" onClick={() => { setShowResults(false); setExist(0); }}>다시 설문</button>
          <SavetheList formData={formData} />
        </div>
        <div className='scroll-container'>
          <h1>건강 체크 결과</h1>
          <div className="result-item">건강 점수: {scores.healthScore}</div>
          <div className="result-item">건강 상태: {scores.healthStatus}</div>
          <div className="result-item">기억감퇴 점수: {scores.memoryScore}</div>
          <div className="result-item">기억감퇴 상태: {scores.memoryStatus}</div>
          <div className="result-item">스트레스 점수: {scores.stressScore}</div>
          <div className="result-item">스트레스 상태: {scores.stressStatus}</div>
          <div className="result-item">영양 점수: {scores.nutritionScore}</div>
          <div className="result-item">영양 상태: {scores.nutritionStatus}</div>
          <div className="result-item">우울 점수: {scores.depressionScore}</div>
          <div className="result-item">우울 상태: {scores.depressionStatus}</div>
          <div className="result-item">설문 일시: {formattedDate}</div>
        </div>
      </div>
    );
  }



  else if (exist == 0) {
    return (
      <div className="HealthChecklist_container">
        <div className="top-bar">
          <button type="button" className="HealthChecklist_main" onClick={() => goToMenu()}></button>
          <button type="button" className="HealthChecklist_save" onClick={calculateScores}></button>
          <SavetheList formData={formData} />
        </div>
        <div className="scroll-container">
          <h1>건강 체크프로그램</h1>
          <h2>건강</h2>
          {questions1.map((question) => (
            <div key={question.id} className="question-box">
              <p className="question-text">{question.question}</p>
              <div className="options-container">
                {question.options.map((option) => (
                  <label key={option} className="option-label">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <h2>기억감퇴</h2>
          {questions2.map((question) => (
            <div key={question.id} className="question-box">
              <p className="question-text">{question.question}</p>
              <div className="options-container">
                {question.options.map((option) => (
                  <label key={option} className="option-label">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <h2>스트레스</h2>
          {questions3.map((question) => (
            <div key={question.id} className="question-box">
              <p className="question-text">{question.question}</p>
              <div className="options-container">
                {question.options.map((option) => (
                  <label key={option} className="option-label">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <h2>영양</h2>
          {questions4.map((question) => (
            <div key={question.id} className="question-box">
              <p className="question-text">{question.question}</p>
              <div className="options-container">
                {question.options.map((option) => (
                  <label key={option} className="option-label">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <h2>우울</h2>
          {questions5.map((question) => (
            <div key={question.id} className="question-box">
              <p className="question-text">{question.question}</p>
              <div className="options-container">
                {question.options.map((option) => (
                  <label key={option} className="option-label">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default HealthChecklist;
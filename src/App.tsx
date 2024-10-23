import React from 'react';
import { useEffect, useState } from 'react';

function getResult(sideA: number, sideB: number, sideC: number) {
  if (sideA >= sideB + sideC || sideB >= sideA + sideC || sideC >= sideA + sideB) {
    return "Такого треугольника не существует";
  } else if (sideA == sideB && sideA == sideC) {
    return "Полученный треугольник равносторонний";
  } else if (sideA == sideB || sideA == sideC || sideB == sideC) {
    return "Полученный треугольник равнобедренный";
  } else {
    return "Полученный треугольник разносторонний";
  }
}

const isCorrect = (num: string) => RegExp("^[0-9]+$").test(num);

function App() {
  const [sideA, setSideA] = useState('');
  const handleChangesideA = (event: any) => setSideA(event.target.value);

  const [sideB, setSideB] = useState('');
  const handleChangesideB = (event: any) => setSideB(event.target.value);

  const [sideC, setSideC] = useState('');
  const handleChangesideC = (event: any) => setSideC(event.target.value);

  const [showModal, setShowModal] = useState(false);

  const [isShown, setIsShown] = useState(false);
  const [result, setResult] = useState('');

  const handleClick = () => {
    if (showModal) {
      setShowModal(false);
    }
    if (isShown) {
      setSideA('');
      setSideB('');
      setSideC('');
    }

    setIsShown(current => !current);

    if (isCorrect(sideA) && isCorrect(sideB) && isCorrect(sideC)) {
      setResult(getResult(+sideA, +sideB, +sideC));
    } else {
      setShowModal(true);
    }
  }

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleClick()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [sideA, sideB, sideC, isShown, showModal]);

  return (
    <>
      <div className='h-screen w-screen flex justify-center items-center'>
        <div className='h-screen w-screen p-[30px] bg-[#0099ff] rounded flex flex-col justify-center items-center md:h-[400px] md:w-[550px]'>
          {!isShown ?
            <>
              <p className='text-[1.5rem] text-center m-[0_0_30px_0] text-white font-semibold'>Введите длины сторон треугольника</p>
              <div className='flex flex-col'>
                <input type="input" className="my-[5px] p-[2.5px] rounded" placeholder="Сторона A" onChange={handleChangesideA} autoFocus/>
                <input type="input" className="my-[5px] p-[2.5px] rounded" placeholder="Сторона B" onChange={handleChangesideB} />
                <input type="input" className="my-[5px] p-[2.5px] rounded" placeholder="Сторона C" onChange={handleChangesideC} />
              </div>
            </>
          : !showModal ?
            <p className='text-[1.5rem] text-center m-[0_0_30px_0] text-white font-semibold'>{result}</p>
          :
            <>
              <p className='text-[1.5rem] text-center m-[0_0_30px_0] text-white font-semibold uppercase'>Ошибка!</p>
              {(sideA == '' || sideB == '' || sideC == '') &&
                <p className='text-[1rem] text-center m-[0_0_10px_0] text-white font-medium'>Поля НЕ должны быть <span className='underline'>пустыми</span></p>
              }
              {(!isCorrect(sideA) || !isCorrect(sideB) || !isCorrect(sideC)) &&
                <p className='text-[1rem] text-center m-[0_0_10px_0] text-white font-medium'>Можно вводить только <span className='underline'>положительные целые числа</span></p>
              }
            </>
          }
          <button onClick={handleClick} className='bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded m-[30px_0_0_0]'>
            <span className='text-[1rem] text-center text-white font-semibold uppercase'>{!isShown ? <>Проверить</> : <>Начать снова</>}</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default App

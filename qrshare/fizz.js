function fizz(){
    for (let i = 1; i <= 100; i++) {
        const isFizz = i % 3 === 0;
        const isBuzz = i % 5 === 0;
     
        if (isFizz & isBuzz) console.log('FizzBuzz');
        else if (isFizz) console.log("Fizz");
        else if (isBuzz) console.log("Buzz");
     }
    }
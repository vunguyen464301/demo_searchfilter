function* id_maker(){
    let index = 0;
    while(index < 3)
      yield index++;
  }
  
  var gen = id_maker();
  
  console.log(gen.next().value); // 0
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // undefined
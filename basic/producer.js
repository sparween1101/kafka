const {Kafka} = require("kafkajs")

const msg = process.argv[2];

async function run(){
    try{
        console.log("Here we are starting !")
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]

        })
        const producer = kafka.producer();
        console.log("Connecting...");
        await producer.connect()
        console.log("Sending");
         //A-M 0, N-Z 1 
        const partition = msg[0] < "N"? 0 : 1;
        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {value:msg,
                "partition": partition}
            ]

        })
        console.log("Sent suceesfully!", JSON.stringify(result));
        await producer.disconnect();

    }catch(e){
        console.error('Something went wrong', e);
    }finally {
       process.exit();
    }
}

run();
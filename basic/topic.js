const {Kafka} = require("kafkajs")

async function run(){
    try{
        console.log("Here we are starting !")
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]

        })
        const admin = kafka.admin();
        console.log("Connecting...");
        await admin.connect()
        console.log("Connected");
        //A-M 0, N-Z 1 
        await admin.createTopics({
            "topics":[{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log("Created suceesfully!")
        admin.disconnect();

    }catch(e){
        console.error('Something went wrong', e);
    }finally {
        process.exit();
    }
}

run();
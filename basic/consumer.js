const { Kafka } = require("kafkajs")
run();
async function run() {
    try {
        console.log("Starting consumer!")
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]

        })
        const consumer = kafka.consumer({ "groupId": "test" });
        console.log("Connecting...");
        await consumer.connect()
        console.log("Consuming");
        await consumer.subscribe({
            "topic": "Users",
            fromBeginning: true  
        })

        await consumer.run({
            "eachMessage": async result => {
                console.log('Received  msg '+result.message.value+ ' on partition', result.partition)
            }
        })

    } catch (e) {
        console.error('Something went wrong', e);
    } finally {

    }
}

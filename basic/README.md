# Basic Kafka application 

This application is based on the crash course by [Hussein Nasser](https://github.com/hnasr)

https://www.youtube.com/watch?v=R873BlNVUB4

His [repo](https://github.com/hnasr/javascript_playground/tree/master/kafka)


## About the project
It is a basic application explaining below topics,

- Kafka architecture
- Producer/Consumer/Topics/Zookeeper
- Consumer groups and Partitions 

## Getting started

I am working with visual studio code on windows machine

### Downloads
- [Docker](https://docs.docker.com/get-docker/)
- [Nodejs](https://nodejs.org/en/download/)
  

### Instructions

#### Spin up Zookeeper 

```
docker run --name zookeeper -p 2181:2181 zookeeper
```

#### Spin up Kafka 

Get the ip for zookeeper. I struggled with it since I was using localhost instead of the docker addesss.

```
docker inspect zookeeper --format='{{.NetworkSettings.IPAddress}}'
```

Now run kafka using the addess fetched above for zookeeper

```
docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=172.17.0.2:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

```
![docker image running](/basic/DockerImageRunning.png)

Install library [kafkajs](https://kafka.js.org/docs/getting-started)

```
npm install kafkajs
```

Create Kakfa object and create a new topic

```
node topic.js
```

Produce a message
```
node producer.js Zebra
```

Consumer
```
node consumer.js
```

Here you can see two different consumers reading from different partitions based on the key we defined in the producer.

![partition rebalancing](/basic/Partition_rebalance.png)







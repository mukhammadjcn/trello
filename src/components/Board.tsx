import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IColumn, ITask, set } from "../redux/slices/kanban";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  Tag,
  Form,
  Input,
  Modal,
  Radio,
  Button,
  message,
  DatePicker,
} from "antd";
import {
  SyncOutlined,
  FieldTimeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const Board: React.FC = () => {
  const [taskForm] = Form.useForm();
  const [columnForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const [columnID, setColumnID] = useState<string>("");
  const [isTaskEdit, setTaskEdit] = useState<boolean>(false);
  const [isColModal, setColModal] = useState<boolean>(false);
  const [isTaskModal, setTaskModal] = useState<boolean>(false);
  const columns = useAppSelector((state) => state.Kanban.columns);

  const onDragEnd = (result: DropResult) => {
    if (result?.destination) {
      let sourceColumnItems: ITask[] = [];
      let destinationColumnItems: ITask[] = [];
      let draggedItem: ITask = {
        id: "",
        value: "",
        label: "",
        date: "",
      };

      let sourceColumnId = 0;
      let destinationColumnId = 0;

      for (let i in columns) {
        if (columns[i].id == result.source.droppableId) {
          sourceColumnItems = columns[i].items;
          sourceColumnId = +i;
        } else if (columns[i].id == result.destination.droppableId) {
          destinationColumnItems = columns[i].items;
          destinationColumnId = +i;
        }
      }

      for (let i in sourceColumnItems) {
        if (sourceColumnItems[i].id == result.draggableId) {
          draggedItem = sourceColumnItems[i];
        }
      }
      // I deleted the dragged object.
      let filteredSourceColumnItems = sourceColumnItems.filter(
        (item) => item.id !== result.draggableId
      );

      // Add the same in the new position.
      if (result.source.droppableId == result.destination.droppableId) {
        filteredSourceColumnItems.splice(
          result.destination.index,
          0,
          draggedItem
        );

        // change the state
        let columnsCopy = JSON.parse(JSON.stringify(columns));
        columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
        dispatch(set([...columnsCopy]));
      } else {
        destinationColumnItems = [...destinationColumnItems, draggedItem];
        // change the state
        let columnsCopy = JSON.parse(JSON.stringify(columns));
        columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
        columnsCopy[destinationColumnId].items = destinationColumnItems;
        dispatch(set([...columnsCopy]));
      }
    }
  };
  const createColumn = ({ name }: { name: string }) => {
    dispatch(
      set([
        ...columns,
        {
          name,
          items: [],
          id: uuidv4(),
        },
      ])
    );
    setColModal(false);
    columnForm.resetFields();
  };
  const createTask = ({ date, ...rest }: any) => {
    let newTask = { date: date.format("DD-MM-YYYY"), ...rest, id: uuidv4() };

    let modifiedIndex = columns.findIndex(
      (col: IColumn) => col.id === columnID
    );

    let modifiedTasks = {
      ...columns[modifiedIndex],
      items: [...columns[modifiedIndex].items, newTask],
    };

    let final = [...columns];
    final.splice(modifiedIndex, 1, modifiedTasks);

    dispatch(set(final));

    setColumnID("");
    setTaskModal(false);
    taskForm.resetFields();
    message.success("New task added succesfully");
  };
  const editTask = (val: ITask) => {
    let newTask = { ...val, date: val.date.format("DD-MM-YYYY") };
    let modifiedColumnIndex = columns.findIndex(
      (col: IColumn) => col.id === columnID
    );
    let modifiedTaskIndex = columns[modifiedColumnIndex].items.findIndex(
      (col: ITask) => col.id === newTask.id
    );

    let finalTasks = [...columns[modifiedColumnIndex].items];
    finalTasks.splice(modifiedTaskIndex, 1, newTask);

    let modifiedTasks = {
      ...columns[modifiedColumnIndex],
      items: [...finalTasks],
    };

    let final = [...columns];
    final.splice(modifiedColumnIndex, 1, modifiedTasks);

    dispatch(set(final));

    setColumnID("");
    setTaskEdit(false);
    setTaskModal(false);
    taskForm.resetFields();
    message.success("Task edited succesfully");
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile__board">
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((column) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={column?.id}
              >
                <h1 className="profile__board--title">{column.name}</h1>

                <Droppable droppableId={column.id} key={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      className="profile__board--container"
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          draggableId={item.id}
                          index={index}
                          key={item.id}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                              onClick={() => {
                                setTaskEdit(true);
                                setTaskModal(true);
                                setColumnID(column?.id);
                                taskForm.setFieldsValue({
                                  ...item,
                                  date: dayjs(item.date, "DD-MM-YYYY"),
                                });
                              }}
                              className="profile__board--task"
                            >
                              {/* Task status */}
                              {item.label == "urgent" ? (
                                <Tag
                                  icon={<ExclamationCircleOutlined />}
                                  color="warning"
                                >
                                  Urgent
                                </Tag>
                              ) : item.label == "success" ? (
                                <Tag
                                  icon={<CheckCircleOutlined />}
                                  color="success"
                                >
                                  Success
                                </Tag>
                              ) : (
                                <Tag
                                  icon={<SyncOutlined spin />}
                                  color="processing"
                                >
                                  Processing
                                </Tag>
                              )}

                              <p>{item.value}</p>
                              <Tag icon={<FieldTimeOutlined />}>
                                {item.date}
                              </Tag>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      <Button
                        type="dashed"
                        onClick={() => {
                          setTaskModal(true);
                          setColumnID(column?.id);
                        }}
                        icon={<PlusOutlined />}
                        className="profile__board--add"
                      >
                        Add field
                      </Button>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => setColModal(true)}
            className="profile__board--create"
          >
            Add column
          </Button>
        </div>
      </div>

      {/* Column creator modal */}
      <Modal
        footer={null}
        title="Kanban column"
        open={isColModal}
        onCancel={() => {
          setColModal(false);
          columnForm.resetFields();
        }}
      >
        <Form form={columnForm} onFinish={createColumn} layout="vertical">
          <Form.Item
            label="New column name"
            name="name"
            rules={[
              { required: true, message: "Please input your column name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "end" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Task creator modal */}
      <Modal
        footer={null}
        title="Task modal"
        open={isTaskModal}
        onCancel={() => {
          setTaskModal(false);
          taskForm.resetFields();
        }}
      >
        <Form
          form={taskForm}
          onFinish={isTaskEdit ? editTask : createTask}
          layout="vertical"
        >
          <Form.Item name="id" style={{ display: "none" }}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Task condition"
            name="label"
            rules={[
              { required: true, message: "Please select task condition!" },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="urgent">Urgent</Radio.Button>
              <Radio.Button value="processing">Processing</Radio.Button>
              <Radio.Button value="success">Success</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Due date"
            name="date"
            rules={[{ required: true, message: "Please input your date!" }]}
          >
            <DatePicker format={"DD-MM-YYYY"} />
          </Form.Item>

          <Form.Item
            label="Task mission"
            name="value"
            rules={[
              { required: true, message: "Please input your task mission!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "end" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Board;

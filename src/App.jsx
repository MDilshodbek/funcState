import { useEffect, useState } from "react";
import "./App.css";
import {
  EditOutlined,
  SettingOutlined,
  // DeleteOutlined,
  SaveOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Input, Skeleton, Button, Dropdown, Menu } from "antd";
const { Meta } = Card;
// import Homework from "./homework";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDelete = (id) => {
    setData(data.filter((value) => value.id !== id));
  };

  const onEdit = (id, currentTitle) => {
    setEditingId(id);
    setNewTitle(currentTitle);
  };

  const onSaveEdit = (id, editedTitle) => {
    // Update the title of the item with the new title
    setData(
      data.map((item) =>
        item.id === id ? { ...item, title: editedTitle } : item
      )
    );
    setEditingId(null); // Reset editing state
  };

  const toggleSkeleton = () => {
    setLoading(!loading); // Toggle the state of the loading skeleton
  };

  return (
    <div className="flex justify-center items-center">
      {/* <div className="flex gap-[20px] items-center justify-center">
        <Button type="primary" danger onClick={decrement}>
          -
        </Button>
        {count}
        <Button type="primary" onClick={increment}>
          +
        </Button>
      </div>
      <div className="flex gap-[20px] items-center justify-center">
        <Button type="primary" danger onClick={() => setCount2(count2 - 1)}>
          -2
        </Button>
        {count2}
        <Button type="primary" onClick={() => setCount2(count2 + 1)}>
          +2
        </Button>
      </div> */}
      <Button onClick={toggleSkeleton} style={{ marginBottom: "20px" }}>
        {loading ? "Turn Off Skeleton" : "Turn On Skeleton"}
      </Button>
      {data.map((value) => {
        return (
          <Card
            key={value.id}
            style={{
              width: 300,
            }}
            cover={
              loading ? (
                <Skeleton.Image
                  active
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
              ) : (
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
              )
            }
            // actions={[
            //   <SettingOutlined key="setting" />,
            //   editingId === value.id ? (
            //     <>
            //       <Input />
            //       <SaveOutlined
            //         onClick={() => onSaveEdit(value.id, newTitle)}
            //         key="save"
            //       />
            //     </>
            //   ) : (
            //     <EditOutlined
            //       onClick={() => onEdit(value.id, value.title)}
            //       key="edit"
            //     />
            //   ),
            //   <Dropdown
            //     overlay={
            //       <Menu>
            //         <Menu.Item key="delete">
            //           <Button type="text" onClick={() => onDelete(value.id)}>
            //             Delete
            //           </Button>
            //         </Menu.Item>
            //         <Menu.Item key="edit">
            //           <Button
            //             type="text"
            //             onClick={() => onEdit(value.id, value.title)}
            //           >
            //             Edit
            //           </Button>
            //         </Menu.Item>
            //       </Menu>
            //     }
            //     trigger={["click"]}
            //   >
            //     <Button>
            //       <DownOutlined />
            //     </Button>
            //   </Dropdown>,
            // ]}
            actions={[
              <SettingOutlined key="setting" />,
              editingId === value.id ? (
                <>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <SaveOutlined
                    onClick={() => onSaveEdit(value.id, newTitle)}
                    key="save"
                  />
                </>
              ) : (
                <EditOutlined
                  onClick={() => onEdit(value.id, value.title)}
                  key="edit"
                />
              ),
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="delete">
                      <Button type="text" onClick={() => onDelete(value.id)}>
                        Delete
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="edit">
                      <Button
                        type="text"
                        onClick={() => onEdit(value.id, value.title)}
                      >
                        Edit
                      </Button>
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button>
                  <DownOutlined />
                </Button>
              </Dropdown>,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={loading || editingId === value.id ? null : value.title}
            />
          </Card>
        );
      })}
    </div>
  );
}

export default App;

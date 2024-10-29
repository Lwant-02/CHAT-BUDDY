import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
export default function MiniSpinner({ size, onClass }) {
  return (
    <Flex align="center" gap="middle">
      <Spin
        indicator={<LoadingOutlined spin />}
        size={size}
        style={{ color: `${onClass}` }}
      />
    </Flex>
  );
}

const router = require("express").Router();

const {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
  }= require("../controller/order");

  router.get("/", getMyOrders);                 
  router.get("/order-by-id/:id", getOrderById);               
  router.post("/add", addOrderItems);             
  router.put("/:id/pay", updateOrderToPaid);      
  router.put("/:id/deliver", updateOrderToDelivered); 
  router.get("/admin", getOrders);               
  



module.exports = router;

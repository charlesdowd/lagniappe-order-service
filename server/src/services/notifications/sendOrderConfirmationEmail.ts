/* eslint-disable prettier/prettier */
import { OrderItem } from '../../models';
import { sendEmail } from './sendEmail';

export async function sendOrderConfirmationEmail(
  email: string,
  company: string,
  orderItems: [OrderItem],
  poNumber: string,
): Promise<void> {
  const customerMailOptions = {
    to: email,
    from: 'order@lagniappefoods.com',
    subject: 'Your Order is Confirmed!',
    html: `<h2>Your order was placed successfully</h2>
          <h4>We will be processing this order as soon as possible. Keep in mind 
          orders are shipped on Wednesdays. Any orders placed after Wednesday at 
          10am will be scheduled for the following Wednesday. Thank you for your business.
          </h4>

          <h2>Order Summary</h2>

          <h3>PO #: ${poNumber || 'N/A'}</h3>

          <div>
            <table style="border-spacing: 35px 10px; text-align: center;">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Description</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${orderItems
                  .map(
                    (orderItem) =>
                      `<tr>
                      <td style="border: 2px solid black; padding: 10px;">${orderItem.product.itemId}</td>
                      <td style="border: 2px solid black; padding: 10px;">${orderItem.product.description}</td>
                      <td style="border: 2px solid black; padding: 10px;">${orderItem.quantity}</td>
                    </tr>`,
                  )
                  .join('')}
              </tbody>
            </table
          </div>
   
            <a href=${process.env.BASE_URL}> 
              View all of your placed orders from your profile dashboard
            </a>`,
  };

  const lagniappeMailOptions = {
    to: 'order@lagniappefoods.com',
    from: 'order@lagniappefoods.com',
    subject: 'New Customer Order Placed!',
    html: `<h2>View the new order in the admin dashboard if needed</h2>
          \n
          <h2>Order Summary</h2>      
          <h4>User: ${email}</h4>
          <h4>Company: ${company}</h4>
          <h4>PO #: ${poNumber || 'N/A'}</h4>
          <div>
            <table style="border-spacing: 35px 10px; text-align: center;">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Description</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${orderItems
                  .map(
                    (orderItem) =>
                      `<tr>
                      <td style="border: 2px solid black; padding: 10px;">${orderItem.product.itemId}</td>
                      <td style="border: 2px solid black; padding: 10px;">${orderItem.product.description}</td>
                      <td style="border: 2px solid black; padding: 10px;">${orderItem.quantity}</td>
                    </tr>`,
                  )
                  .join('')}
              </tbody>
            </table
          </div>

        
            <a href=${process.env.BASE_URL}/admin>
              View order in admin dashboard
            </a>
        `,
  };

  // Send Lagniappe new user order email
  await sendEmail(lagniappeMailOptions);

  // Send customer order confirmation email
  await sendEmail(customerMailOptions);
}

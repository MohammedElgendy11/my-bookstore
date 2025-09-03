import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    address: string;
  };
  cartItems: Array<{
    book: {
      id: string;
      title: string;
      author: string;
      price: number;
    };
    quantity: number;
  }>;
  total: number;
  orderNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerInfo, cartItems, total, orderNumber }: OrderEmailRequest = await req.json();

    console.log("Processing order email for:", customerInfo.email);

    // Generate order details HTML
    const itemsHtml = cartItems.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${item.book.title}</td>
        <td style="padding: 12px; text-align: left;">${item.book.author}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">$${item.book.price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right;">$${(item.book.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const customerEmailHtml = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #2d5a4a, #4a7c59); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 28px;">Order Confirmation</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase!</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2d5a4a; font-family: 'Playfair Display', serif; margin-bottom: 10px;">Order #${orderNumber}</h2>
            <p style="color: #666; margin: 0;">We've received your order and will process it soon.</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #2d5a4a; margin-bottom: 15px;">Shipping Information</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2d5a4a;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${customerInfo.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${customerInfo.email}</p>
              ${customerInfo.phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${customerInfo.phone}</p>` : ''}
              <p style="margin: 5px 0;"><strong>Address:</strong> ${customerInfo.address}</p>
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #2d5a4a; margin-bottom: 15px;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #2d5a4a; color: white;">
                  <th style="padding: 15px; text-align: left;">Book Title</th>
                  <th style="padding: 15px; text-align: left;">Author</th>
                  <th style="padding: 15px; text-align: center;">Qty</th>
                  <th style="padding: 15px; text-align: right;">Price</th>
                  <th style="padding: 15px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr style="background: #e9ecef; font-weight: bold; font-size: 16px;">
                  <td colspan="4" style="padding: 15px; text-align: right;">Total:</td>
                  <td style="padding: 15px; text-align: right; color: #2d5a4a;">$${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #d4a574; margin-bottom: 20px;">
            <p style="margin: 0; color: #666; font-style: italic;">
              "A room without books is like a body without a soul." - Marcus Tullius Cicero
            </p>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            We'll send you another email with tracking information once your order ships. 
            If you have any questions, please don't hesitate to contact us.
          </p>
        </div>

        <div style="background: #2d5a4a; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; opacity: 0.8;">Thank you for choosing our bookstore!</p>
        </div>
      </div>
    `;

    // Send email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "NBooks Store <onboarding@resend.dev>",
      to: [customerInfo.email],
      subject: `Order Confirmation #${orderNumber} - Thank you for your purchase!`,
      html: customerEmailHtml,
    });

    console.log("Customer email sent successfully:", customerEmailResponse);

    // Send notification email to store owner (replace with your email)
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a4a;">New Order Received! 🎉</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Customer:</strong> ${customerInfo.name} (${customerInfo.email})</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        
        <h3>Items Ordered:</h3>
        <ul>
          ${cartItems.map(item => `
            <li>${item.book.title} by ${item.book.author} - Qty: ${item.quantity} - $${(item.book.price * item.quantity).toFixed(2)}</li>
          `).join('')}
        </ul>
        
        <h3>Shipping Address:</h3>
        <p>${customerInfo.address}</p>
        ${customerInfo.phone ? `<p><strong>Phone:</strong> ${customerInfo.phone}</p>` : ''}
      </div>
    `;

    const ownerEmailResponse = await resend.emails.send({
      from: "NBooks Store <onboarding@resend.dev>",
      to: ["store@nbooks.com"], // Replace with your actual email
      subject: `New Order #${orderNumber} - $${total.toFixed(2)}`,
      html: ownerEmailHtml,
    });

    console.log("Owner notification email sent successfully:", ownerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailId: customerEmailResponse.data?.id,
        ownerEmailId: ownerEmailResponse.data?.id 
      }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
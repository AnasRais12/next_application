import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from '@mui/material';

const ReturnPolicy = () => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', pt: 5 }}>
      <Grid  >
        {/* Header Card */}
        <Paper elevation={3} sx={{ borderRadius: 2, }}>
                 <div className="  overflow-hidden   ">
        <div className="bg-primary p-6 md:p-8 xl:px-14 text-center">
       <h1 className=" text-3xl custom:text-4xl sm:text-4xl md:text-4xl font-bold pt-6 text-white mb-2">
             Return & Refund Policy
          </h1>
          <p className="text-white xs:text-md custom:text-md sm:text-lg">
          At <strong>Shopease</strong>, we want you to be completely satisfied with your purchase. If you're not happy with your order, we'll make it right.<br/>
          Last updated: {formattedDate}
          </p>
        </div>
      </div>
        </Paper>
       

        {/* Policy Content */}
        <Grid elevation={1} sx={{  px: { xs: 3, sm: 6, md: 4,mobileS:2 }, pt: 6, border:'none'  }}>
          <PolicySection
            title="1. Our Return Policy"
            content={
              <>
                <Typography paragraph>
                  We accept returns within <strong className='text-primary' >30 days</strong> of the purchase date for most items. To be eligible for a return:
                </Typography>
               <List sx={{ listStyleType: 'disc', pl: 2 }}>
                 <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="The item must be unused and in its original condition" /></ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="Original tags and packaging must be intact" /></ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="A proof of purchase is required" /></ListItem>
                </List>
                <Alert severity="info" sx={{ mt: 2, bgcolor: '#eff6ff', borderLeft: '5px solid #60a5fa' }}>
                  <Typography fontWeight="bold">Note:</Typography>
                  Some items are final sale and not eligible for return, including perishable goods, intimate apparel, and personalized items.
                </Alert>
              </>
            }
          />

          <PolicySection
            title="2. How to Initiate a Return"
            content={
              <>
                <Typography paragraph>
                  To return an item, please follow these steps:
                </Typography>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} md={4}><StepBox number="1" title="Request Return" description="Contact our support team or initiate return through your account" /></Grid>
                  <Grid item xs={12} md={4}><StepBox number="2" title="Package Item" description="Securely pack the item with original packaging" /></Grid>
                  <Grid item xs={12} md={4}><StepBox number="3" title="Ship Back" description="Use provided return label or ship to our warehouse" /></Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary">
                  *Return shipping costs may apply unless the return is due to our error
                </Typography>
              </>
            }
          />

          <PolicySection
            title="3. Refund Process"
            content={
              <>
                <Typography paragraph>Once we receive your return:</Typography>
               <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="We will inspect the returned item within 3-5 business days" /></ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="Refunds will be processed to your original payment method" /></ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="You will receive email confirmation when your refund is issued" /></ListItem>
                </List>
                <Alert severity="warning" sx={{ mt: 2, bgcolor: '#fef9c3', borderLeft: '5px solid #facc15' }}>
                  <Typography fontWeight="bold">Processing Times:</Typography>
                  Credit card refunds may take 5-10 business days to appear on your statement depending on your bank's processing time.
                </Alert>
              </>
            }
          />
             <PolicySection
              title="4. Exchanges"
              content={
                <>
                  <Typography paragraph>We currently offer exchanges for:</Typography>
                 <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="Different size of the same item (subject to availability)" /></ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="Different color of the same item (subject to availability)" /></ListItem>
                  <ListItem sx={{ display: 'list-item', py: 0.5 }}><ListItemText primary="You will receive email confirmation when your refund is issued" /></ListItem>
                </List>
                  <Typography paragraph> To request an exchange, please contact our customer service
                    team before returning your item.</Typography>
                </>
              }
            />
                <PolicySection
              title="5. Damaged or Defective Items"
              content={
                <>
                    <Typography paragraph>
                    If you receive a damaged or defective item:
                  </Typography>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
  <ListItem sx={{ display: 'list-item', py: 0.5 }}>
    <ListItemText primary="Contact us within 48 hours of delivery" />
  </ListItem>
  <ListItem sx={{ display: 'list-item', py: 0.5 }}>
    <ListItemText primary="Provide photos of the damage/defect" />
  </ListItem>
  <ListItem sx={{ display: 'list-item', py: 0.5 }}>
    <ListItemText primary="We will arrange for free return shipping and expedite your replacement" />
  </ListItem>
</List>

                </>
              }
            />
              <PolicySection
              title="6.  International Returns"
              content={
                <>
                    <Typography paragraph>
                     For international orders:
                  </Typography>
                  <List sx={{ listStyleType: 'disc', pl: 2 }}>
        <ListItem sx={{ display: 'list-item', py: 0.5 }}>
          <ListItemText primary="Return shipping costs are the responsibility of the customer" />
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5 }}>
          <ListItemText primary="Customs fees are non-refundable" />
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5 }}>
          <ListItemText primary="Please mark the package as 'Returned Goods' to avoid additional customs charges" />
        </ListItem>
      </List>
                </>
              }
            />


          {/* More sections like Exchanges, Damaged Items, International Returns can be added similarly */}

          {/* <Divider sx={{ my: 6 }} />
                      replacement
                    </li>
                  </ul>
                </>
              }
            />

          {/* More sections like Exchanges, Damaged Items, International Returns can be added similarly */}

          {/* <Divider sx={{ my: 6 }} />
          <Typography variant="h5" color="primary" gutterBottom>
            Frequently Asked Questions
          </Typography>

          <FAQItem
            question="How long does it take to process my refund?"
            answer="Refunds are typically processed within 3-5 business days after we receive your return. The time it takes for the credit to appear in your account depends on your payment method and financial institution."
          />
          <FAQItem
            question="Can I return sale items?"
            answer="Yes, sale items can be returned within the standard 30-day return period, provided they meet all return conditions."
          />
          <FAQItem
            question="What if I lost my receipt?"
            answer="We can look up your purchase with your order number or the email address used to place the order. If you purchased as a guest, please contact us with details about your purchase."
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

const PolicySection = ({ title, content }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
    <Box sx={{ color: 'text.secondary' }}>{content}</Box>
  </Box>
);

const StepBox = ({ number, title, description }) => (
  <Paper elevation={1} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
    <Box
      sx={{
        width: 32,
        height: 32,
        bgcolor: '#d1fae5',
        color: '#047857',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontWeight: 'bold',
        mx: 'auto',
        mb: 1,
      }}
    >
      {number}
    </Box>
    <Typography fontWeight="medium" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const FAQItem = ({ question, answer }) => (
  <Box sx={{ mb: 3 }}>
    <Typography fontWeight="medium" gutterBottom>
      {question}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {answer}
    </Typography>
  </Box>
);

export default ReturnPolicy;

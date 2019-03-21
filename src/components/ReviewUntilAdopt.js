import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { REVIEW } from '../config';
import { TableSelect, TableText, TableTextarea } from '../components';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  priceEndText: {
    margin: 10,
    fontSize: 16,
    verticalAlign: 'bottom',
  },
});

const ReviewUntilAdopt = props => {
  const { classes, info, handleChange, handleCheckChange } = props;

  const untilAdoptCell = [
    {
      label: '導入に携わりましたか',
      value: info.isParticipant,
      key: 'isParticipant',
      list: REVIEW.YES_OR_NO,
    },
    {
      label: '知ったきっかけ',
      value: info.firstContact,
      key: 'firstContact',
      list: REVIEW.UNTIL_ADOPT.FIRST_CONTACT,
    },
  ];

  const contactTextarea = [
    {
      label: 'きっかけを入力してください',
      value: info.reasonFirstContact,
      key: 'reasonFirstContact',
    },
    {
      label: '検討理由',
      value: info.considerationReason,
      key: 'considerationReason',
    },
  ];

  const otherSaasText = [
    {
      label: '他に検討した製品',
      value: info.otherSaas,
      key: 'otherSaas',
    },
  ];

  const untilAdoptCellSecond = [
    {
      label: '検討期間',
      value: info.considerationPeriod,
      key: 'considerationPeriod',
      list: REVIEW.UNTIL_ADOPT.PERIOD,
    },
    {
      label: '営業対応',
      value: info.sales,
      key: 'sales',
      list: REVIEW.SATISFACTION_LEVEL,
    },
    {
      label: 'ディスカウントの有無',
      value: info.isDiscounted,
      key: 'isDiscounted',
      list: REVIEW.UNTIL_ADOPT.IS_DISCOUNTED,
    },
    {
      label: 'ディスカウントの割合',
      value: info.discountRate,
      key: 'discountRate',
      list: REVIEW.UNTIL_ADOPT.DISCOUNT_RATE,
    },
  ];

  const decisionTextarea = [
    {
      label: '導入の決め手',
      value: info.discountRate,
      key: 'discountRate',
    },
  ];

  const untilAdoptCellThird = [
    {
      label: '導入期間',
      value: info.onboadingPeriod,
      key: 'onboadingPeriod',
      list: REVIEW.UNTIL_ADOPT.ONBOADING_PERIOD,
    },
    {
      label: '導入体制の満足度',
      value: info.onboadingSatisfaction,
      key: 'onboadingSatisfaction',
      list: REVIEW.SATISFACTION_LEVEL,
    },
  ];

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h6" gutterBottom>
        導入にあたって
      </Typography>
      <Paper className={classes.paper}>
        <Table>
          <TableBody>
            <TableSelect
              list={untilAdoptCell}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
        <TableTextarea
          list={contactTextarea}
          handleChange={event => handleChange(event)}
        />
        <Table>
          <TableBody>
            <TableText
              list={otherSaasText}
              handleChange={event => handleChange(event)}
            />
            <TableSelect
              list={untilAdoptCellSecond}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
        <TableTextarea
          list={decisionTextarea}
          handleChange={event => handleChange(event)}
        />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>導入体制</Typography>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={info.onboadingSystemA}
                      onChange={event => handleCheckChange(event)}
                      value="onboadingSystemA"
                    />
                  }
                  label="社内で実施"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={info.onboadingSystemB}
                      onChange={event => handleCheckChange(event)}
                      value="onboadingSystemB"
                    />
                  }
                  label="パートナーで実施"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={info.onboadingSystemC}
                      onChange={event => handleCheckChange(event)}
                      value="onboadingSystemC"
                    />
                  }
                  label="メーカーで実施"
                />
              </TableCell>
            </TableRow>
            <TableSelect
              list={untilAdoptCellThird}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ReviewUntilAdopt);
